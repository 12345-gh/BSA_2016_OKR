var app = angular.module('intranet-mediator');
app.service('roleResourceService', roleResourceService);

function roleResourceService($resource) {
	return $resource('api/roles/:id', {
		id: '@_id'
	}, {
		update: {
			method: 'PUT'
		}
	});
}