'use strict'

var http = require('http'),
	util = require('util'),
	formidable = require('formidable'),
	querystring = require('querystring'),
	url = require('url'),
	EventEmitter = require('events').EventEmitter;

var server_handle = function(req,res){
	var self = this;
	self.request = req;
	self.response = res;

	var param = url.parse(req.url,true,true);

	var form = new formidable.IncomingForm();

	form.on('error',function(err){
		console.log(err);
		self.response_404('form data error');
	});

	form.parse(req,function(err,fields,files){
		if (err) {
			self.response_404('form parse error');
		} else {			
			var data = {};
			data.fields = fields;
console.log(param);
console.log('_________________________________');
console.log(data);
			self.response_200(JSON.stringify(data));
		}
	})
}

server_handle.prototype.response_200 = function(body,headers){
	headers = headers || {'content-type': 'text/plain'};
	this.response.writeHead(200,headers);
	this.response.write(body);
	this.response.end();
}

server_handle.prototype.response_404 =function(body,headers){
	headers = headers || {'content-type': 'text/plain'};

    this.response.writeHead(404, headers);
    this.response.write(body);
    this.response.end();
}

function server_request_handler (request, response) {
    var handler = new server_handle(request, response);
}

var node_server = http.createServer(server_request_handler).listen(8888);

node_server
.on('listening',function(){
	console.log('node server started.');
});

