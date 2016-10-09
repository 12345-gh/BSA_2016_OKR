var async = require('async'),
	bcrypt = require('bcrypt-nodejs'),
	roleRepository = require('../repositories/role'),
	userRepository = require('../repositories/user');

function InitiaService() {

}

InitiaService.prototype.checkDefaultUser = checkDefaultUser;

function checkDefaultUser() {
	var defaultEmail = 'admin@default.com',
		defaultPawword = '123';
	async.waterfall([
		function getDefaultUser(callback) {
			userRepository.getByEmail(defaultEmail, callback);
		},
		function insertIfNotFound(user, callback) {
			if (user) callback(null, null);
			else {
				userRepository.add({
					email: defaultEmail,
					password: defaultPawword,
					role: 'ADMIN'
				}, function(err, data) {
					console.log('\
								\n---------------------------------------------------------------------------\n' +
						'Defaul user Inserted\n' +
						'email: ' + defaultEmail +
						'\npassword: ' + defaultPawword +
						'\n---------------------------------------------------------------------------');
					callback(err, data);
				});
			}
		}
	]);
}

module.exports = new InitiaService();