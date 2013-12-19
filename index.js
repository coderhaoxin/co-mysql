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
	}
}
