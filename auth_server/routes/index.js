var checkToken = require('../middleware/checkToken');

module.exports = function(app){

	var common = require('./common')(app);
	var view = require('./view')(app);
	var auth = require('./auth')(app);
	var user_common = require('./user_common')(app);
	app.use(checkToken);
	var auth = require('./user')(app);
	var role = require('./role')(app);
	var protected_routes = require('./protected_routes')(app); 
	
};