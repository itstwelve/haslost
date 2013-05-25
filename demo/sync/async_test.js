var async = require('async');
var fs = require('fs');

var aaa ='xxx';
async.concat(['f1.js','f2.js'],fs.readFile,function(err,files){
	if (err) {
		console.log(err);
	}else{
		console.log(typeof files);
		//console.log(files.toString());

		aaa =files.toString();
	}
});


console.log(aaa);