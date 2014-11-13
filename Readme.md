### Please use modules `thunkify` or `promisify` directly.

[![NPM version][npm-img]][npm-url]
[![Build status][travis-img]][travis-url]
[![Test coverage][coveralls-img]][coveralls-url]
[![License][license-img]][license-url]
[![Dependency status][david-img]][david-url]

[npm-img]: https://img.shields.io/npm/v/co-mysql.svg?style=flat-square
[npm-url]: https://npmjs.org/package/co-mysql
[travis-img]: https://img.shields.io/travis/coderhaoxin/co-mysql.svg?style=flat-square
[travis-url]: https://travis-ci.org/coderhaoxin/co-mysql
[coveralls-img]: https://img.shields.io/coveralls/coderhaoxin/co-mysql.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/coderhaoxin/co-mysql?branch=master
[license-img]: https://img.shields.io/badge/license-MIT-green.svg?style=flat-square
[license-url]: http://opensource.org/licenses/MIT
[david-img]: https://img.shields.io/david/coderhaoxin/co-mysql.svg?style=flat-square
[david-url]: https://david-dm.org/coderhaoxin/co-mysql

### usage

```js
var wrapper = require('co-mysql'),
  mysql = require('mysql'),
  co = require('co');

var pool = mysql.createPool(options),
  p = wrapper(pool);

// promise
p.query('SELECT 1').then(...).catch(...);

// co
co(function*() {
  var rows = yield p.query('SELECT 1');
})();
```

### License
MIT
