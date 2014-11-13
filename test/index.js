'use strict';

var assert = require('assert'),
  equal = assert.deepEqual,
  mysql = require('mysql'),
  wrapper = require('..'),
  co = require('co');

describe('## co-mysql', function() {
  var config = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'test',
  };

  describe('# connection', function() {
    it('should query success', function(done) {
      co(function * () {
        var connection = mysql.createConnection(config);
        connection.connect();

        var client = wrapper(connection);
        var rows = yield client.query('SELECT 10086 + 10000 AS q');
        equal(rows[0].q, 20086);

        connection.end();
      })(done);
    });

    it('should query with params success', function(done) {
      co(function * () {
        var connection = mysql.createConnection(config);
        connection.connect();

        var client = wrapper(connection);
        var rows = yield client.query('SELECT 10086 + ? AS q', 10000);
        equal(rows[0].q, 20086);

        connection.end();
      })(done);
    });

    it('should query with promise success', function(done) {
      var connection = mysql.createConnection(config);
      connection.connect();

      var client = wrapper(connection);
      client.query('SELECT 10086 + ? AS q', 10000).then(function(rows) {
        equal(rows[0].q, 20086);

        connection.end();
        done();
      });
    });

    it('should catch by promise', function(done) {
      var connection = mysql.createConnection(config);
      connection.connect();

      var client = wrapper(connection);
      client.query('SELECT ?').catch(function() {
        connection.end();
        done();
      });
    });
  });

  describe('# pool', function() {
    it('should query success', function(done) {
      co(function * () {
        var pool = mysql.createPool(config),
          client = wrapper(pool),
          rows = yield client.query('SELECT 10086 + 10000 AS q');

        equal(rows[0].q, 20086);

        pool.end();
      })(done);
    });

    it('should query with params success', function(done) {
      co(function * () {
        var pool = mysql.createPool(config),
          client = wrapper(pool),
          rows = yield client.query('SELECT 10086 + ? AS q', 10000);

        equal(rows[0].q, 20086);

        pool.end();
      })(done);
    });

    it('should query with promise success', function(done) {
      var pool = mysql.createPool(config),
        client = wrapper(pool);

      client.query('SELECT 10086 + ? AS q', 10000).then(function(rows) {
        equal(rows[0].q, 20086);

        pool.end();
        done();
      });
    });

    it('should catch by promise', function(done) {
      var pool = mysql.createPool(config),
        client = wrapper(pool);

      client.query('SELECT ?').catch(function() {
        pool.end();
        done();
      });
    });
  });
});
