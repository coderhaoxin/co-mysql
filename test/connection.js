'use strict';

var mysql = require('../index'),
  should = require('should'),
  co = require('co'),
  config = require('./config');

describe('connection', function() {
  it('should query success', function(done) {
    co(function * () {
      var connection = mysql.createConnection(config);
      connection.connect();

      var result = yield connection.query('SELECT 10086 + 10000 AS q');

      result[0][0].q.should.equal(20086);

      connection.end();
    })(done);
  });

  it('should query with params success', function(done) {
    co(function * () {
      var connection = mysql.createConnection(config);
      connection.connect();

      var result = yield connection.query('SELECT 10086 + ? AS q', 10000);

      result[0][0].q.should.equal(20086);

      connection.end();
    })(done);
  });

  it('should query with escape success', function(done) {
    co(function * () {
      var connection = mysql.createConnection(config);
      connection.connect();

      var sql = 'SELECT 10086 + ' + connection.escape(10000) + ' AS q',
        result = yield connection.query(sql);

      result[0][0].q.should.equal(20086);

      connection.end();
    })(done);
  });
});