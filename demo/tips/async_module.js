'use strict'

var async = require('async');
var event_demo = require('./event_demo.js').event_demo;

var demo = function(){
	/*
	async.parallel([
		function(callback){
			callback(null, '111');
		},
		function(callback){
			callback(null, '222');
		},
		function(callback){
			callback(null, '333');
		}
	],function(err,reply){
		console.log('_______________');
		console.log(err);
		console.log(reply);
	});
*/

	async.waterfall([
		function(callback){
			var event_ins = new event_demo(4);
			event_ins
			.on('ready',function(data){
				callback(null, data);
			})
			.on('error',function(err){
				callback(err);
			});			
		},
		function(d,callback){
			if (typeof d === 'string') {
				callback('data tpye error');
			} else {
				console.log('2---', d);
				callback(null, '222');
			}
		},
		function(d,callback){
			console.log('3---', d);
			callback(null, '333');
		}
	],function(err,reply){
		console.log('_______________');
		console.log(err);
		console.log(reply);
	});
}

var d =  new demo();