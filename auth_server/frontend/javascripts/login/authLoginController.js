var app = angular.module('intranet-mediator');
app.controller('AuthLoginController', AuthLoginController);

function AuthLoginController(authService, $location, $rootScope, $http, $q) {
	var vm = this;

	vm.loggedIn = authService.isLoggedIn();
	vm.loginErrorShown = false;
	vm.loginErrorMessage = '';

	vm.init = function() {
		var messages = document.getElementById('messages');
		setTimeout(function() {
			messages.remove();
		}, 2000);
	};

	vm.login = function() {
		authService.login(vm.user.email, vm.user.password, function(data) {
			if (data.success === true) {
				if (data.referer === undefined || data.referer === '' || data.referer.indexOf('auth') !== -1) {
					// $location.path('/users');
					window.location.href = 'http://team.binary-studio.com';
				} else {
					window.location.href = decodeURIComponent(data.referer);
				}
			} else {
				vm.loginErrorShown = true;
				vm.loginErrorMessage = data.message;
			}

		});
	};

	vm.init();
}