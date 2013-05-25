var rpc = require('../rpc/rpc.js').rpc;
var should = require('should');
var assert =  require('assert');

describe('rpc test',function(){
	describe('rpc unit test',function(){

		it('it should be hoho',function(done){
			var r_test = new rpc(7);
			r_test.on('ready',function(reply){
				(typeof reply).should.equal('string');
				//assert.equal('object',reply);
				done();
			})
		})
	})
})
