var util = require('util');
var EventEmitter = require('events').EventEmitter;
var mongodb_client = require('mongodb').MongoClient;
var pool_module = require('generic-pool');
var _ = require('underscore');

var uri = 'mongodb://tom:111111@192.168.0.12:27017/little_tom';
var mongodb_options = {
    server: {
        auto_reconnect:true, poolSize: 200,
        socketOptions: {
            connectTimeoutMS: 1000
        }
    }
}

var mongodb_pool = pool_module.Pool({
	name: 'mongodb',
	create: function(callback){
		mongodb_client.connect(uri, mongodb_options,function(err,client){
			if (err) {
				callback(err);
			} else {
				callback(null,client);
			}
		});
        
	},
	destroy  : function(client) { client.close(); },
    max      : 500,
    // optional. if you set this, make sure to drain() (see step 3)
    //min      : 10, 
    // specifies how long a resource can stay idle in pool before being removed
    idleTimeoutMillis : 5000,
    // if true, logs via console.log - can also be a function
    log : false 
});

var mongodb_demo = function(){
	var self = this;
	mongodb_pool.acquire(function(err,db_client){
		if (err) {
			console.log(err);
		} else {
			var data_arr = [];
			for (var i = 100000; i < 150000; i++) {
				var ua_key = Number((Math.random()*1000).toFixed(0));
				var tmp = {id:i,name:'tom'+i,age:ua_key};
				data_arr.push(tmp);
			};
			db_client.collection('coco').insert(data_arr,function(err,reply){
				if (err) {
					console.log(err);
				} else {
					console.log('_________________');
					//console.log(reply);
				}
			});
		}
	})
}

exports.mongodb_demo = mongodb_demo;

// var data_arr = [];
// for (var i = 0; i < 80000; i++) {
// 	var ua_key = Number((Math.random()*1000).toFixed(0));
// 	var tmp = {id:i,name:'tom'+i,age:ua_key};
// 	data_arr.push(tmp);
// };

//new mongodb_demo();