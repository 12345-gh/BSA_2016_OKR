var injectData = require('../middleware/injectData');
var config = require('../config');

module.exports = function(app){

	app.get('/login', function(req, res){
		res.render('login');
	});

	app.get('/registration', function(req, res){
		injectData(req, res, {}, false);
	});

	app.get('/setNewPassword/:email/:hash', function(req, res){
		res.render('setNewPassword', { email: req.params.email, hash: req.params.hash, baseUrl: config.host.auth_host });
	});

	app.get('/forgotPassword', function(req, res){
		res.render('forgotPassword', { baseUrl: config.host.auth_host });
	});
	
};