var jsonwebtoken = require('jsonwebtoken');
var config = require('../config');

function TokenService(){

}

TokenService.prototype.createToken = function(user) {
	var token = jsonwebtoken.sign({
		id: user._id,
		email: user.email,
		role: user.role
	}, config.token.secretKey, {
		expirtesInMinute: 1440
	});

	return token;	
};

module.exports = new TokenService();