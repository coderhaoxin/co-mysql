var mysql  = require('../index')
var should = require('should')
var co     = require('co')

describe('connection', function () {
	it('show query', function (done) {
		co(function* () {
			var pool = mysql.createPool({
				user: 'root',
				database: 'test',
				password: '123456'
			})
			var connection = yield pool.getConnection()

			var result = yield connection.query('SELECT 10086 + 10000 AS q')
			result[0][0].q.should.equal(20086)

			connection.release()
		})(done)
	})
})
