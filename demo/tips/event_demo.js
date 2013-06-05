'use strict'
var util = require('util'),
	EventEmitter = require('events').EventEmitter;

var event_demo = function(i){
	var self = this;

	process.nextTick(function(){
		var tom = [{name: 'tom', age: 2},{name: 'jerry', age: 5}];
		if (i > 5) {
			self.emit('ready',tom);
		} else{
			self.emit('error','event module error.');
		}
	});
}

util.inherits(event_demo,EventEmitter);

exports.event_demo = event_demo;
