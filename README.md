## mysql wrappers for 'co'

### install
```zsh
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

	try {
		var result01 = yield connection.query('SELECT * FROM item')
		var data01 = result01[0]
		console.log(data01)

		var result02 = yield connection.query('SELECT * FROM item WHERE name = "hello, world"') // null
		var data02 = result02[0]
		console.log(data02)
	} catch (e) {
		console.log(e.message)
	}

	try {
		var result03 = yield connection.query('SELECT * FROM item WHERE') // error
		var data03 = result03[0]
		console.log(data01)
	} catch (e) {
		console.log(e.message)
	}

	connection.end()
})()
```

### warning
```
need node.js >= 0.11.4

run with --harmony
```
