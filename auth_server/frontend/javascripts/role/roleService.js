var app = angular.module('intranet-mediator');
app.service('roleService', roleService);

function roleService($resource) {
	var roles = ['ADMIN', 'DEVELOPER', 'HR'];
	var access_to_route = {
		'DEVELOPER': [],
		'HR': []
	};
	var common_routes = ['/'];

	this.checkAccessToRoute = function(role, route) {
		if (role === 'ADMIN' || common_routes.indexOf(route) !== -1) {
			return true;
		}

		if (access_to_route[role].indexOf(route) !== -1) {
			return true;
		} else {
			return false;
		}
	};
}