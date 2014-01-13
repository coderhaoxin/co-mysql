[![NPM](https://nodei.co/npm/co-mysql.png?downloads=true)](https://nodei.co/npm/co-mysql/)

## [node-mysql](https://github.com/felixge/node-mysql) wrapper for [co](https://github.com/visionmedia/co) or [koa](https://github.com/koajs/koa)

### install
```bash
npm install co-mysql
```

### how to use
```js
var co    = require('co')
var mysql = require('co-mysql')

co(function* () {
	var connection = mysql.createConnection({
		user: 'root',
		database: 'test',
		password: 'your password'
	})

	connection.connect()

	var result = yield connection.query('SELECT 10086 + 10000 AS q')
	// ......

	connection.end()
})()
```

### use pool
```js
var co    = require('co')
var mysql = require('co-mysql')

co(function* () {
	var pool = mysql.createPool({
		user: 'root',
		database: 'test',
		password: 'your password'
	})

	var connection = yield pool.getConnection()

	var result = yield connection.query('SELECT * FROM user')
	// ......

	connection.release()
})()
```
