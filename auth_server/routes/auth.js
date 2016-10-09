var User = require('../schemas/User');
var TokenService = require('../services/tokenService');
var UserService = require('../services/userService');
var Cookies = require('cookies');
var config = require('../config');

module.exports = function(app){

	app.post('/api/login', function(req, res){
		User.findOne({ 
			email: req.body.email,
		}).select('email role password').exec(function(err, user) {

			if (err) {
				throw err;
			}

			if (!user) {
				res.send({ message: "User doesn't exist"});
			} else if(user){ 
				//var validPassword = UserService.isValidHash(req.body.password, user.password);

				//if (!validPassword) {
				//	res.send({ message: "Invalid Password"});
				//} else {
					var token = TokenService.createToken(user);

					var cookies = new Cookies(req, res);
					cookies.set('x-access-token', token, {httpOnly: false});
					
					var referer = cookies.get('referer');
					cookies.set('referer');

					res.json({
						success: true,
						message: "Successfuly login!",
						token: token,
						referer: referer
					});
				//}
			}
		});
	});

	app.get('/logout', function(req, res){
		var cookies = new Cookies(req, res);
		cookies.set('x-access-token');
		res.redirect('/' + config.host.prefix);
	});

};