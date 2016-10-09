var userService = require('../services/userService');
var config = require('../config');

module.exports = function(app){

	app.post('/api/users/forgotPassword', function(req, res, next){
		var email = req.body.email;
		
		userService.sendForgotEmail(email, function(err, data){
			if (!err) {
				req.flash('info', 'Check your email!');
			} else {
				req.flash('error', err.message);
			}
			res.redirect('/' + config.host.prefix);
		});
	});

	app.post('/api/users/changePassword', function(req, res, next){
		res.data = userService.changePasswordByHash(req.body.email, req.body.hash, req.body.password, function(err, data){
			if (!err) {
				req.flash('info', 'Password has been changed successfully!');
			} else {
				req.flash('error', err.message);
			}
			res.redirect('/' + config.host.prefix);
		});	
	});

	// app.put('/api/users/changePassword/:id', function(req, res, next){
	// 	userService.changePassword(req.params.id, req.body, function(err, data){
	// 		res.data = data;
	// 		res.err = err;
	// 		next();
	// 	});
	// }, apiResponse);

}