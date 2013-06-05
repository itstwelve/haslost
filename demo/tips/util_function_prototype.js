//console.log(process);


var util = require('util');
//util.isArray()

var EventEmitter = require('events').EventEmitter;

var base = function(){
	var self = this;
	self.name = 'base';
	self.base = 1983;
	self.sayHello = function(){
		//this.name = 'nnn'
		console.log('Hello '+ this.name);
	}
}

base.prototype.showName = function(){
	console.log(this.name);
}

var sub = function(){
	this.name = 'sub';
	//console.log('this name ');
}

/*
* demo util.inherits
*/
util.inherits(sub,base);

var t1 = new base();
// t1.sayHello();
// t1.showName();
console.log(t1);
var t2 = new sub();
// t2.sayHello();
// t2.showName();

//console.log(t1 instanceof base);
console.log(t2);

console.log('________________________');
/*
* util.inspect
*/

var inspect_demo = util.inspect(t1,true);

console.log(typeof inspect_demo);
console.log(inspect_demo);