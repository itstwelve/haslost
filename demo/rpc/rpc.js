'use strict'
var EventEmitter = require('events').EventEmitter;
var proxy = require('eventProxy');
var util = require('util');

var status = 'ready';
var pro = new proxy();

var rpc = function(i){
	var self = this;

	pro.once("selected", function(results){
		console.log('____________'+i);
		console.log(results);
		self.emit('ready','hoho');
	});
    if (status === "ready") {
        status = "pending";
        // db.select("SQL", function (results) {
        //     proxy.emit("selected", results);
        // });
		console.log('+++++++++++++++++++++');

		setTimeout(function(){
			pro.emit('selected','123456');
			status = "ready";
		},1000);
    }
	// process.nextTick(function(){
	// 	self.emit('ready','hoho...');
	// });
}

util.inherits(rpc,EventEmitter);
exports.rpc =  rpc;


// 'use strict'

// var rpc = require('./rpc.js').rpc;

// for (var i = 0; i < 5; i++) {
// 	var r = new rpc(i);
// }