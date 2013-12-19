'use strict';

var mysql = require('mysql'),
  config = require('../test/config'),
  times = 100000,
  start = Date.now(),
  flag = 0,
  pool = mysql.createPool(config);

function run() {
  pool.query('SELECT 1 AS q', function(error) {
    if (error) {
      throw error;
    }
    flag++;
    if (flag === times) {
      console.log('due time: ', Date.now() - start);
    }
  });

}

for (var i = 0; i < times; i++) {
  run();
}