'use strict';

module.exports = wrapper;

var slice = [].slice;

function wrapper(client) {
  var query = client.query;

  var o = {};

  o.query = function() {
    var args = slice.call(arguments);
    var p = new Promise(function(resolve, reject) {
      args.push(function(err, rows) {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });

      query.apply(client, args);
    });

    return p;
  };

  return o;
}
