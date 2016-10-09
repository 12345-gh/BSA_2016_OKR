var config = require('../config');

module.exports = function(app){

	app.get('/', function(req, res, next) {
		res.render('index', { 
			messages: {
				'info': req.flash('info'),
				'error': req.flash('error')
			},
			baseUrl: config.host.auth_host
		});
	});	

	// app.get('*', function(req, res, next) {
	// 	console.log('Not FOUND');
	// 	console.log('REQ.URL', req.url);
	// });

};