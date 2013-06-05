var util = require('util');
var EventEmitter = require('events').EventEmitter;
var mongodb_client = require('mongodb').MongoClient;
var pool_module = require('generic-pool');
var _ = require('underscore');

var uri = 'mongodb://tom:111111@192.168.0.12:27017/new_data';
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
			// db_client.collection('click').find().toArray(function(err,reply){
			// 	if (err) {
			// 		console.log(err);
			// 	} else {
			// 		console.log('_________________');
			// 		console.log(reply.length);
			// 	}
			// });

			db_client.collectionNames(function(err,res){
				if (err) {
					console.log(err);
				} else{
					console.log(res.length);					
					var coll_t = /^new_data.tmp./;
					_.each(res,function(v){
						console.log(v.name)
						if(coll_t.test(v.name)){
							db_client.collection(v.name.slice(9)).drop(function(err,res){
								if (err) {
									console.log(err);
								} else {
									console.log(res)
								}
							});							
						} else {

						}
					})
				}
			})
		}
	})
}

exports.mongodb_demo = mongodb_demo;

new mongodb_demo();