var mysql = require('mysql')

function wrap(fn, context) {
	return function () {
		var args = [].slice.call(arguments);
		return function (done) {
			args.push(done)
			fn.apply(context, args)
		}
	}
}

function wrapConnection(connection) {
	connection['query'] = wrap(connection['query'], connection)
	return connection
}

module.exports = {
	createConnection: function (option) {
		return wrapConnection(mysql.createConnection(option))
	},
	createPool: function (option) {
		var pool = mysql.createPool(option)
		var getConnection = pool.getConnection
		var wrappedGetConnection = function () {
			return function (done) {
				getConnection.call(pool, function (error, connection) {
					if (error) {
						return done(error)
					}
					return done(null, wrapConnection(connection))
				})
			}
		}
		pool.getConnection = wrappedGetConnection
		return pool
	}
}
