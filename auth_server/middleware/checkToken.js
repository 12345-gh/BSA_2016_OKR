var jsonwebtoken = require('jsonwebtoken');
var config = require('../config');
var Cookies = require('cookies')

module.exports = function(req, res, next){
	var cookies = new Cookies(req, res);
	var token = req.body.token || req.param('token') || req.headers['x-access-token'] || cookies.get('x-access-token');

	if (token) {
		jsonwebtoken.verify(token, config.token.secretKey, function(err, decoded) {
			if (err) {
				res.status(403).send({ success: false, message: "Failed to authenticate user"});
			} else {
				req.decoded = decoded;
				next();
			}
		});
	} else {
		res.status(403).send({ success: false, message: "No Token Provided"});
	}
};