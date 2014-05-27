'use strict'

var mysql = require('mysql'),
    slice = [].slice

function wrap(fn, context) {
  return function() {
    var args = slice.call(arguments);
    return function(done) {
      args.push(done)
      fn.apply(context, args)
    }
  }
}

function wrapConnection(connection) {
  var query = connection.query
  connection.query = wrap(query, connection)
  connection.q = function() {
    var args = slice.call(arguments)
    return function(done) {
      args.push(function(err, rows, fields) {
        done(err, rows)
      })
      query.apply(connection, args)
    }
  }
  return connection
}

exports.createConnection = function(options) {
  return wrapConnection(mysql.createConnection(options))
}

exports.createPool = function(options) {
  return wrapConnection(mysql.createPool(options))
}
