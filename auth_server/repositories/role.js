var Repository = require('../units/Repository');
var Role = require('../schemas/Role');


function RoleRepository (){
	Repository.prototype.constructor.call(this);
	this.model = Role;
}

RoleRepository.prototype = new Repository();

module.exports = new RoleRepository();