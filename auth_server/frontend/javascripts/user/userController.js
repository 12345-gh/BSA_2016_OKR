var app = angular.module('intranet-mediator');
app.controller('UserListController', function($location, UserService, authService, $http) {
	var vm = this;

	vm.init = function() {
		vm.users = UserService.query();

		authService.getUser()
			.then(function(response) {
				vm.current_user = response.data;
			});
	};

	vm.newUser = function() {
		$location.path('/users/new');
	};

	vm.detailUser = function(user) {
		$location.path('/users/view/' + user.id);
	};

	vm.deleteUser = function(user) {
		var user_id = user._id;
		user.$delete(function() {
			$http.delete('http://team.binary-studio.com/profile/api/users/' + user_id).then(function() {
				console.log('deleted user');
			});
			$location.path('/users');
		});
	};

	vm.init();
})

.controller('UserDetailController', function($location, $routeParams, UserService, authService, roleResourceService) {
	var vm = this;
	vm.user = {};
	vm.roles = roleResourceService.query();

	vm.init = function() {
		if ($routeParams.id) {
			vm.user = UserService.get({
				id: $routeParams.id
			});
		}

		authService.getUser()
			.then(function(response) {
				vm.current_user = response.data;
			});
	};

	vm.updateUser = function() {
		if ($routeParams.id) {
			vm.user.$update(function() {
				$location.path('/users');
			});
		} else {
			if (vm.confirm_password === vm.user.password) {
				UserService.save(vm.user, function() {
					// $location.path('/users');
					window.location.href = 'http://team.binary-studio.com/profile/#/newuser';
				});
			}
		}
	};

	vm.returnHome = function() {
		$location.path('/users');
	};

	vm.init();
});