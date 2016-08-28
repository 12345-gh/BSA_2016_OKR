var CONST = require('../config/constants');

module.exports = {
	isCorrectId: isCorrectId,
	isEmpty: isEmpty,
	isEmptyObject: isEmptyObject,
	isArray: isArray,
	isObject: isObject,
	getValidDifficulty: getValidDifficulty,
	isStringBoolean: isStringBoolean
};

function isCorrectId(id) {
	var id = '' + id;
	var regex = /^[a-fA-F0-9]{24}$/;

	id = id.trim();

	if(!id || !regex.test(id)) {
		return false;
	}

	return true;

}

function isEmpty(value) {
	return (value == null || value.length === 0) || isEmptyObject(value);
}

function isEmptyObject(obj) {
	return (typeof obj === "object" && Object.getOwnPropertyNames(obj).length == 0);
}

function isArray(value) {
  return Object.prototype.toString.call(value) === '[object Array]';
}

function isObject(value) {
  return typeof value === 'object';
}

function getValidDifficulty(value) {
	return CONST.keyResult[value.toUpperCase()];
}

function isStringBoolean(value) {
	switch (value.toLowerCase()) {
	    case "0":
			case "1":
			case "true":
			case "false":
	        var result = true;
	        break;
	    default:
	        var result = false;
	}
	
	return result
}
