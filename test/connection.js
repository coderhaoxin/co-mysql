var mysql  = require('../index')
var should = require('should')
var co     = require('co')

describe('connection', function () {
	it('show query', function (done) {
		co(function* () {
			var connection = mysql.createConnection({
				user: 'root',
				database: 'test',
				password: '123456'
			})

			connection.connect()

			var result = yield connection.query('SELECT 10086 + 10000 AS q')
			result[0][0].q.should.equal(20086)

			connection.end()
		})(done)
	})
})
