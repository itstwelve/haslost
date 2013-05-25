'use strict'

var rpc = require('./rpc.js').rpc;

for (var i = 0; i < 5; i++) {
	//var r = new rpc(i);
};

var r = new rpc(7);
r.on('ready',function(rs){
	console.log(rs);
});