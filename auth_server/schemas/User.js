var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;
var bcrypt = require('bcrypt-nodejs');

var User = new mongoose.Schema({
	email: String,
	password: String,
	role: String
});

User.pre('save', function(next) {
	console.log('pre save');
	var userData = this;

	if (!userData.isModified('password')) return next();

	bcrypt.genSalt(1012, function(err, salt) {
		bcrypt.hash(userData.password, null, null, function(err, hash) {
			userData.password = hash;
			next();
		});
	});
});

User.pre('update', function(next) {
	console.log('pre update');
	var userData = this;
	
	if (userData.password !== undefined && !userData.isModified('password')) return next();

	bcrypt.genSalt(1012, function(err, salt) {
		bcrypt.hash(userData.password, null, null, function(err, hash) {
			userData.password = hash;
			next();
		});
	});
});

module.exports = mongoose.model('User', User);