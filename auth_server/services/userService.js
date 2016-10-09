var userRepo = require('../repositories/user');
var bcrypt = require('bcrypt-nodejs');
var mailService = require('./mailService');
var config = require('../config');

var secret = "superpupersecret";

function UserService(){

}

UserService.prototype.saveUser = function(body, callback) {
	console.log(body);
	userRepo.add({
		email: body.email,
		password: body.password,
		role: body.role
	}, function(err, data){
		callback(err, data);	
	});
}

UserService.prototype.updateUser = function(id, body, callback) {
	userRepo.update(id, body, function(err, data){
		callback(err, data);	
	});
}

UserService.prototype.changePassword = function(id, body, callback) {
	var self = this;

	userRepo.getById(id, function(err, user){
		if (self.isValidHash(body.old_password, user.password)) {
			var new_password;

			bcrypt.genSalt(1012, function(err, salt) {
				bcrypt.hash(body.new_password, null, null, function(err, hash) {
					var query = self.updateUser(id, {password:hash}, function(err, user){
						callback(err, user);
					});
				});
			});
		} else {
			callback({message: 'Not valid password!'}, {});
		}
	});
}

UserService.prototype.changePasswordByHash = function(email, hash, password, callback) {
	var self = this;

	userRepo.getByEmail(email, function(err, user){
		if (self.isValidHash(email + secret, self.addSlash(hash))) {
			bcrypt.genSalt(1012, function(err, salt) {
				bcrypt.hash(password, null, null, function(err, new_hash) {
					var query = self.updateUser(user.id, {password:new_hash}, function(err, user){
						callback(err, user);
					});
				});
			});
		} else {
			callback({message: 'User not found!'}, null);
		}
	});
};

UserService.prototype.isValidHash = function(source, hash){
	try {
	  return bcrypt.compareSync(source, hash);
	} catch(e) {
	  return false;
	}
}

UserService.prototype.sendInfoEmail = function(email, password, callback) {
	var self = this;
	bcrypt.genSalt(1012, function(err, salt) {
		bcrypt.hash(email + secret, null, null, function(err, hash) {
			var link = config.host.auth_host + 'setNewPassword/' + email + '/' + self.rmSlash(hash);
			var text = '<div>Hi there! <br><br> Here\'s your temporary password: <br> ' + password + '</div><br>';

			text += 'Follow this link to set your password: <br> ' + link + '<br><br>';

			text += 'Your profile: <br>http://team.binary-studio.com/profile';

			mailService.sendEmail({
				to: email,
				from: 'Binary Studio',
				text: text,
				subject: 'Setting new password'
			}, function(err, data) {
				callback(err, null);
			});
		});
	});
}

UserService.prototype.sendForgotEmail = function(email, callback) {
	var self = this;
	self.checkEmailExist(email, function(err, data){
		if (data) {
			bcrypt.genSalt(1012, function(err, salt) {
				bcrypt.hash(email + secret, null, null, function(err, hash) {
					var link = config.host.auth_host + 'setNewPassword/' + email + '/' + self.rmSlash(hash);
					var text = 'Follow this link to set your new password: <br> ' + link;

					mailService.sendEmail({
						to: email,
						from: 'Binary Studio',
						text: text,
						subject: 'Setting new password'
					}, function(err, data) {
						callback(err, null);
					});
				});
			});
		} else {
			callback({message: 'User not found!'}, null);
		}
	})
}

UserService.prototype.checkEmailExist = function(email, callback) {
	userRepo.getByEmail(email, function(err, data) {
		callback(err, data);
	})
}

UserService.prototype.rmSlash = function(hash) {
	return hash.replace('/', '##');
}

UserService.prototype.addSlash = function(hash) {
	return hash.replace('##', '/');	
}

module.exports = new UserService();