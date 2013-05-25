'use strict'
var should = require('should');
var assert =  require('assert');

var redis_opt = require('../redis_operation/redis_operation.js');

describe('Redis operation:read/write/del',function(){
	describe('redis write',function(){
		it('it should be string:notice(success/error).',function(done){
			var data = ['aaa',111,'bbb',222,'ccc',333];
			var redis_write_test = new redis_opt.redis_write(data);
			redis_write_test
			.on('ready',function(res){
				(typeof res).should.equal('string');
				done();
			})
			.on('error',function(err){
				(typeof res).should.equal('string');
				done();
			});
		});

	});

	describe('redis read',function(){
		it('Redis read:it should be  json string:result',function(done){
			var keys = ['aaa','bbb'];
			var redis_read_test = new redis_opt.redis_read(keys);
			redis_read_test
			.on('ready',function(res){
				(typeof res).should.equal('object');
				(res.length).should.equal(keys.length);
				done();
			})
			.on('error',function(err){
				(typeof err).should.equal('string');
				done();
			});
		});
	});

	describe('redis delete',function(){
		it('Redis del:it should be string:notice',function(done){
			var del_keys = ['ccc','ddd'];
			var redis_del_test = new redis_opt.redis_del(del_keys);
			redis_del_test
			.on('ready',function(res){
				(typeof res).should.equal('string');
				done();
			})
			.on('error',function(err){
				(typeof err).should.equal('string');
				done();
			});

		});
	})

});