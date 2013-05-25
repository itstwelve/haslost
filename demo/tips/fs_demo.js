'use strict'

var fs = require('fs');


fs.readFile('file_demo.md','utf8',function(err,data){
	console.log(err);
	console.log(data);
});