'use strict'

var util = require('util'),
	redis = require('redis'),
	pool_module = require('generic-pool'),
	event_proxy = require('eventProxy'),
	underscore = require('underscore'),
	EventEmitter = require('events').EventEmitter;

var redis_pool = pool_module.Pool({
	name:'redis connect',
	create:function(callback){
		var conn = redis.createClient({host:'192.168.0.201',port:6379});
		conn
		.on('ready',function(){
			callback(null,conn);
		})
		.on('error',function(err){
			callback(err);
		})
	},
	destroy:function(client) { client.end(); },
	max:100,
	idleTimeoutMillis:30000,
    log:false 
});

/*
* key_vals:['key1','val1','key2','key3']
* alive
*/
var redis_write = function(key_vals,alive){
	var self = this;
	var expire = alive || 0;
	var pairs =  parseInt((key_vals.length)/2);
	var write_fail = [];

    redis_pool.acquire(function (err, client) {
        if (err) {
            console.log('Redis connect error.');
            self.emit('error','Redis connect error.');
        } else {
            var redis_timeout = setTimeout(function(){
                self.emit('error','Redis operate timeout.');
            	client.quit();
                redis_pool.release(client);
            },2000);

            if (expire === 0) {
            	client.mset(key_vals,function(err,res){
            		if (err) {
            			console.log(err);
                        self.emit('error','Redis write error.');
            		} else {
            			self.emit('ready','Redis write success.');
            		}
            	});
            } else {
            	var ep = new event_proxy();
            	ep.after('all_redis_write',pairs,function(){
            		console.log('redis write success.');
            		self.emit('ready','Redis write success.');
            		if(write_fail.length > 0){
            			console.log('These data write fail.');
            		}
            	});

            	for (var i = 0; i < pairs; i++) {
            		var k = i*2;
            		var v = i*2+1;
            		if (key_vals[k] !== undefined && key_vals[v] !== undefined ) {
            			client.multi()
			                .setex(key_vals[k], expire, key_vals[v])
			                .exec(function(err,res){
			            	if (err) {
			            		write_fail.push(key_vals[k]);
			            		console.log(err);
			            		ep.emit('all_redis_write');
			            	} else {
			            		ep.emit('all_redis_write');
			            	}
			            });
            		} else {
            			ep.emit('all_redis_write');
            		}					
            	}
            }            
        }
    });
}

util.inherits(redis_write,EventEmitter);

/*
* keys: []/string
*/
var redis_read = function(keys){
	var self = this;

	redis_pool.acquire(function(err,client){
		if (err) {
			console.log('Redis connect error.');
            self.emit('error','Redis connect error.');
		} else {
			var redis_timeout = setTimeout(function(){
				console.log('Redis opterate timeout.');
                self.emit('error','Redis operate timeout.');
                client.quit();
				redis_pool.release(client);
            },2000);

			client.mget(keys, function (err, res) {
                if (err) {
					console.log('Redis mget error.');
                    self.emit('error','Redis mget error.');
                } else {
                	/*
                	res : object ['json string1'/null,'json string2',...]
                	*/
                    self.emit('ready',res);
                	console.log('Redis mget success.');
                	console.log(res);
                	console.log(res.length);
                	console.log(typeof res);
                }
                clearTimeout(redis_timeout);
                redis_pool.release(client);
            });            
		}
	});

}

util.inherits(redis_read,EventEmitter);

/*
* keys: []/string
*/
var redis_del = function(keys){
    var self = this;

    redis_pool.acquire(function (err, client) {
        if (err) {
            console.log('Redis connect error.');
            self.emit('error','Redis connect error.');
        } else {
            var redis_timeout = setTimeout(function(){
                console.log('Redis opterate timeout.');
                self.emit('error','Redis operate timeout.');
                client.quit();
                redis_pool.release(client);
            },10000);

            client.del(keys, function (err, res) {
                if (err) {
                    console.log(err);
                    self.emit('error','Redis delete error.');
                } else {
                    console.log('Redis delete success.');
                    self.emit('ready','Redis delete success.');
                }
                clearTimeout(redis_timeout);
                redis_pool.release(client);
            })
        }
    });
}

util.inherits(redis_del,EventEmitter);

exports.redis_write = redis_write;
exports.redis_read = redis_read;
exports.redis_del = redis_del;


// var data_arr = [];
// for (var i = 0; i < 1000; i++) {
// 	data_arr.push('tom'+i);
// 	data_arr.push('jerry'+i);
// };
// console.log(data_arr);
var data = ['aaa',111,'bbb',222,'ccc',333];
var t2 = new redis_write(data);
// var t1 = new redis_read('bbb');
// var t3 = new redis_del('bbb');