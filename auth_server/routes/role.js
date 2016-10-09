var apiResponse = require('express-api-response');
var roleRepo = require('../repositories/role');
// var userService = require('../services/userService');

module.exports = function(app){

	app.get('/api/roles', function(req, res, next){
		roleRepo.getAll(function(err, roles) {
			res.data = roles;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.get('/api/roles/:id', function(req, res, next){
		roleRepo.getById(req.params.id, function(err, role){
			res.data = role;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.post('/api/roles', function(req, res, next){
		roleRepo.add(req.body, function(err, data){
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.put('/api/roles/:id', function(req, res, next){
		roleRepo.update(req.params.id, req.body, function(err, data){
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.delete('/api/roles/:id', function(req, res, next){
		roleRepo.delete(req.params.id, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

}