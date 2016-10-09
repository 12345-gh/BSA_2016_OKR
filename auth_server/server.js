var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var dbConnectionHandler = require('./units/dbConnectionHandler');
var morgan = require('morgan');
// var amqp = require('amqplib/callback_api');
var flash = require('connect-flash');
var session = require('express-session');
var initialService = require('./services/initialService');

var app = express();

app.use(function(req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "DELETE,GET,POST,PUT,OPTIONS");
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	return next();
});

app.use(session({
	secret: 'superpupersecret',
	cookie: {
		maxAge: 60000
	}
}));
app.use(flash());

app.use(morgan('dev'));

app.set('views', path.normalize(__dirname + '/frontend/views'));
app.set('view engine', 'jade');

var staticPath = path.normalize(__dirname + '/public');
app.use(express.static(staticPath));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

initialService.checkDefaultUser();

var routes = require('./routes/')(app);

app.listen(2020);