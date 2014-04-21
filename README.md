### look first
```js
'use strict';

var mysql = require('mysql'),
  co = require('co'),
  thunkify = require('thunkify');

var pool = mysql.createPool({
  user: 'root'
});

var query = function(sql, values, cb) {
  if (typeof values === 'function') {
    cb = values;
    values = null;
  }
  pool.query(sql, values, function(err, rows) {
    cb(err, rows);
  });
};

query = thunkify(query);

co(function * () {
  var rows = yield query('select 1 AS q');
  console.log(rows);
})();
```
## yes, you should not use `co-mysql`! >_<

[![NPM](https://nodei.co/npm/co-mysql.png?downloads=true)](https://nodei.co/npm/co-mysql/)

## [node-mysql](https://github.com/felixge/node-mysql) wrapper for [co](https://github.com/visionmedia/co) or [koa](https://github.com/koajs/koa)

### install
```bash
npm install co-mysql
```

### how to use
```js
var co = require('co'),
  mysql = require('co-mysql');

co(function*() {
  var connection = mysql.createConnection(options);
  connection.connect();
  var result = yield connection.query('SELECT 10086 + 10000 AS q');
  connection.end();
})();
```

### use pool
```js
var co = require('co'),
  mysql = require('co-mysql');

co(function*() {
  var pool = mysql.createPool(options);
  var result = yield pool.query('SELECT 1');
  pool.end();
})();
```

### License
MIT
