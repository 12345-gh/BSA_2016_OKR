var apiResponse = require('express-api-response');
var userRepo = require('../repositories/user');
var userService = require('../services/userService');
var tokenService = require('../services/tokenService');
var Cookies = require('cookies');

module.exports = function(app){

	app.get('/api/users', function(req, res, next){
		// userRepo.getIds(function(err, ids) {
		// 	res.data = ids;
		// 	res.err = err;
		// 	next();
		// });
		userRepo.getAll(function(err, users) {
			res.data = users;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.get('/api/users/:id', function(req, res, next){
		userRepo.getById(req.params.id, function(err, user){
			res.data = user;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.post('/api/users', function(req, res, next){
		userService.saveUser(req.body, function(err, data){
			if (!err) {
				userService.sendInfoEmail(req.body.email, req.body.password, function(err, data) {
					console.log(err, data);
				});
			}

			var token = tokenService.createToken(data);
			var cookies = new Cookies(req, res);
			cookies.set('newInfo', token);

			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.put('/api/users/:id', function(req, res, next){
		userService.updateUser(req.params.id, req.body, function(err, data){
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.delete('/api/users/:id', function(req, res, next){
		userRepo.delete(req.params.id, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

};