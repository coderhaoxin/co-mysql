[![NPM](https://nodei.co/npm/co-mysql.png?downloads=true)](https://nodei.co/npm/co-mysql/)

## `node-mysql` wrapper for `co`

### note
```bash
need node.js >= 0.11.4

# run with
node --harmony
```

### install
```bash
npm install co-mysql

npm install mysql
npm install co
```

### how to use
```js
var co    = require('co')
var mysql = require('co-mysql')

co(function* () {
	var connection = mysql.createConnection({ user: 'root', database: 'test', password: '123456'})
	connection.connect()

	var result = yield connection.query('SELECT * FROM user')
	var data = result[0]
	console.log(data)

	// ......

	connection.end()
})()
```

### use pool
```js
var co    = require('co')
var mysql = require('co-mysql')

co(function* () {
	var pool = mysql.createPool({ user: 'root', database: 'test', password: '123456' })
	var connection = yield pool.getConnection()

	var result = yield connection.query('SELECT * FROM user')
	var data = result[0]
	console.log(data)

	// ......

	connection.release()
})()
```
