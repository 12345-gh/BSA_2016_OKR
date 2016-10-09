var app = angular.module('intranet-mediator');
app.service('UserService', userService);

function userService($resource) {
	return $resource('api/users/:id', {
		id: '@_id'
	}, {
		update: {
			method: 'PUT'
		}
	});
}