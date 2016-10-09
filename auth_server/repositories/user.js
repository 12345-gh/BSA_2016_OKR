var Repository = require('../units/Repository');
var User = require('../schemas/User');


function UserRepository (){
	Repository.prototype.constructor.call(this);
	this.model = User;
}

UserRepository.prototype = new Repository();

UserRepository.prototype.getIds = function(callback){
	var query = this.model.find({}, {'_id':1});
	query.exec(callback);
};

UserRepository.prototype.getByEmail = function(email, callback){
	var query = this.model.findOne({email: email});
	query.exec(callback);
};

module.exports = new UserRepository();