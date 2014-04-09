'use strict';

var mysql = require('../index'),
  should = require('should'),
  co = require('co'),
  config = require('./config');

describe('pool', function() {
  it('should query success', function(done) {
    co(function * () {
      var pool = mysql.createPool(config),
        result = yield pool.query('SELECT 10086 + 10000 AS q');

      result[0][0].q.should.equal(20086);

      pool.end();
    })(done);
  });

  it('should query with params success', function(done) {
    co(function * () {
      var pool = mysql.createPool(config),
        result = yield pool.query('SELECT 10086 + ? AS q', 10000);

      result[0][0].q.should.equal(20086);

      pool.end();
    })(done);
  });

  it('should query with escape success', function(done) {
    co(function * () {
      var pool = mysql.createPool(config),
        sql = 'SELECT 10086 + ' + pool.escape(10000) + ' AS q',
        result = yield pool.query(sql);

      result[0][0].q.should.equal(20086);

      pool.end();
    })(done);
  });
});