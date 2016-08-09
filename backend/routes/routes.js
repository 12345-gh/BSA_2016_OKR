const auth = require('./auth');
const response = require('./response');

module.exports = function(app) {
	const api = require('./api/routes')(app);
	
	app.use('/', response);
	app.use('/api', auth, api);
};
