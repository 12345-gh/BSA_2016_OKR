var app = angular.module('intranet-mediator');
app.controller('RoleListController', function($location, roleResourceService) {
	var vm = this;

	vm.init = function() {
		vm.roles = roleResourceService.query();
	};

	vm.newRole = function() {
		$location.path('/roles/new');
	};

	vm.detailRole = function(role) {
		$location.path('/roles/view/' + role.id);
	};

	vm.deleteRole = function(role) {
		role.$delete(function() {
			$location.path('/roles');
		});
	};

	vm.init();
})

.controller('RoleDetailController', function($location, $routeParams, roleResourceService) {
	var vm = this;
	vm.role = {};

	vm.init = function() {
		if ($routeParams.id) {
			vm.role = roleResourceService.get({
				id: $routeParams.id
			});
		}
	};

	vm.updateRole = function() {
		if ($routeParams.id) {
			vm.role.$update(function() {
				$location.path('/roles');
			});
		} else {
			roleResourceService.save(vm.role, function() {
				$location.path('/roles');
			});
		}
	};

	vm.returnHome = function() {
		$location.path('/roles');
	};

	vm.init();
});