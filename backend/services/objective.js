var UserRepository = require('../repositories/user.js'),
	ObjectiveRepository = require('../repositories/objective.js'),
	KeysRepository = require('../repositories/key.js'),
	async = require('async');

var ObjectiveService = function() {};

ObjectiveService.prototype.add = function(data, callback) {
	async.waterfall([
		(callback) => {
			return callback(null);
		}
	], (err, result) => {
		return callback(err, result);	
	});
};

ObjectiveService.prototype.autocomplete = function(title, callback) {
	async.waterfall([
		(callback) => {
			ObjectiveRepository.getAll(function(err, objArr) {
				if (err) {
					return callback(err, null);
				}

				return callback(null, objArr);
			});
		}, 
		(objArr, callback) => {
			let objectives = [];
			
			objArr.forEach((objective) => {
				if (objective.title.toLowerCase().indexOf(title.toLowerCase()) !== -1) {
					objectives.push(objective);
				}
			});

			return callback(null, objectives);
		}
	], (err, result) => {
		return callback(err, result);
	});
}

/**
*
* @param data - contain three object: 1) objective 2) keys array 3) userId
* @param callback
*/
// ObjectiveService.prototype.addObjectiveToUser = (data, callback) => {
// 	let userId = data.userId;

// 	async.waterfall([
// 		addObjectiveTemplateToDb,
// 		addObjectiveToUser,
// 		addEventsToHistory,
// 	], (err, result) => {
// 		callback(err);
// 	});

// 	function addObjectiveTemplateToDb(callback) {
// 		if (!data.objective.objectiveId) {
// 			async.waterfall([
// 				(callback) => {
// 					ObjectiveRepository.add(data.objective, (err, data) => {
// 						if (err) {
// 							return callback(err, null);
// 						};

// 						return callback(null);
// 					});
// 				}, (callback) => {
// 					async.every(data.keys, (key, callback) => {
// 						KeysRepository.add(key, (err, data) => {
// 							return err ? callback(err, null) : callback(null);
// 						});
// 					}, (err, result) => {
// 							return callback(err);
// 					});
// 				}
// 			], (err, result) => {
// 				return callback(err);
// 			});
// 		} else {
// 			async.waterfall([
// 				(callback) => {
// 					ObjectiveRepository.getById(data.objective.objectiveId, (err, objective) => {
// 						if (err) {
// 							return callback(err, null);
// 						};

// 						return callback(null, objective);
// 					}
// 				}, (objective, callback) => {
// 					if(objective.forks.indexOf(userId) === -1) {
// 						objective.forks.push(userId);
// 					}

// 					return callback(null);
// 				}, (callback) => {
// 					data.keys.forEach((key) => {
// 						if(key.id) {
// 							// Fork key from keys collection
// 							KeysRepository.getById(key.id, (err, key)  => {
// 								if(key.forks.indexOf(userId) === -1) {
// 									key.forks.push(userId);
// 								}

// 								return callback(null);
// 							});
// 						} else {
// 							// Add key to keys collection
// 							KeysRepository.add(key, (err, data) => {
// 								return err ? callback(err, null) : callback(null);
// 							})
// 						}
// 					});
// 				}
// 			], (err, result) => {
// 				return callback(err);
// 			});
// 		}

// 		callback(null);
// 	}
	
// 	function addObjectiveToUser(callback) {
// 		return callback(null, 'three');
// 	}

// 	function addEventsToHistory(callback) {
// 		return callback(null, 'done');
// 	}
// };

module.exports = new ObjectiveService();