## mysql wrappers for 'co'

### install
```zsh
npm install co-mysql
npm install mysql
```

### how to use
```js
var co    = require('co')
var mysql = require('co-mysql')

co(function* () {
  var connection = mysql.createConnection({ user: 'root', database: 'test', password: '123456'})
  connection.connect()

  console.log( yield connection.query("select 1+1 as qqq") )
  console.log( yield connection.query("select 1+2 as qqq") )
  console.log( yield connection.query("select 1+3 as qqq") )

  connection.end()
})
```
