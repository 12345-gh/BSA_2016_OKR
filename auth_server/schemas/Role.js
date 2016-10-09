var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var Role = new mongoose.Schema({
	role: String
});

module.exports = mongoose.model('Role', Role);