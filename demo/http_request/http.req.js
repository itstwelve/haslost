'use strict'

var http = require('http'),
	util = require('util'),
	EventEmitter = require('events').EventEmitter;


var http_request = function(){
	var self = this;
	var options = {
		host:'127.0.0.1',
		port:8888,
		//auth:'frank2012:6c2a6df91d',
		//path:'/public/outer.php?controller=OfferRegulation&action=getUpdateOfferInfo',
		//path:'/piv3/site/detect/22.json',
		method:'POST',
		headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
	};
	var data = {
		a:1,b:2,c:3
	}

	var http_post = http.request(options,function(res){
		res.setEncoding('utf8');

		if (res.statusCode == 200) {
			res.on('data',function(chunk){
				console.log(chunk);
				var res_data = JSON.parse(chunk);

				console.log(res_data);
				console.log(typeof res_data);
			})
		}else{
			console.log('------------------');
		}
	});

	http_post
	.on('error',function(err){
		console.log(err);
	});

	http_post.setTimeout(5000,function(){
		http_post.abort();
	});

	http_post.write(JSON.stringify(data));

	http_post.end();
}

util.inherits(http_request,EventEmitter);

exports.http_request =  http_request;

new http_request();