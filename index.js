'use strict';

var mysql = require('mysql');

function wrap(fn, context) {
  return function() {
    var args = [].slice.call(arguments);
    return function(done) {
      args.push(done);
      fn.apply(context, args);
    };
  };
}

function wrapConnection(connection) {
  connection.query = wrap(connection.query, connection);
  return connection;
}

exports.createConnection = function(options) {
  return wrapConnection(mysql.createConnection(options));
};

exports.createPool = function(options) {
  var pool = mysql.createPool(options);

  return {
    query: wrap(pool.query, pool),
    end: function() {
      pool.end();
    },
    escape: function() {
      return pool.escape.apply(pool, arguments);
    }
  };
};