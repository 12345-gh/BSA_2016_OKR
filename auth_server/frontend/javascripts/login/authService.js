var app = angular.module('intranet-mediator');
app.service('authService', authService);

function authService($http, $q, $cookies) {

	this.login = function(email, password, callback) {

		return $http.post('api/login', {
				email: email,
				password: password
			})
			.success(function(data) {
				callback(data);
			});
	};

	this.logout = function() {
		$cookies.remove('x-access-token');
	};

	this.isLoggedIn = function() {
		if ($cookies.get('x-access-token'))
			return true;
		else
			return false;
	};

	this.getUser = function() {
		if ($cookies.get('x-access-token')) {
			return $http.get('api/me');
		} else {
			return $q.reject({
				message: "User has no token"
			});
		}

	};

}