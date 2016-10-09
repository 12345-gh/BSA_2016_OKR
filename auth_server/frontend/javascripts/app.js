module.exports = angular.module('intranet-mediator', ['ngRoute', 'ngResource', 'ngCookies'])
	.config(['$routeProvider', '$resourceProvider', '$httpProvider', '$locationProvider',
		function($routeProvider, $resourceProvider, $httpProvider, $locationProvider) {
			$routeProvider
				.when('/', {
					templateUrl: './templates/login/authLogin.html',
					controller: 'AuthLoginController',
					controllerAs: 'authLoginCtrl'
				})
				.when('/users', {
					templateUrl: './templates/user/list.html',
					controller: 'UserListController',
					controllerAs: 'userListCtrl'					
				})
				.when('/users/view/:id', {
					templateUrl: './templates/user/detail.html',
					controller: 'UserDetailController',
					controllerAs: 'userDetailCtrl'
				})
				.when('/users/new', {
					templateUrl: './templates/user/detail.html',
					controller: 'UserDetailController',
					controllerAs: 'userDetailCtrl'
				})
				.when('/roles', {
					templateUrl: './templates/role/list.html',
					controller: 'RoleListController',
					controllerAs: 'roleListCtrl'					
				})
				.when('/roles/view/:id', {
					templateUrl: './templates/role/detail.html',
					controller: 'RoleDetailController',
					controllerAs: 'roleDetailCtrl'					
				})
				.when('/roles/new', {
					templateUrl: './templates/role/detail.html',
					controller: 'RoleDetailController',
					controllerAs: 'roleDetailCtrl'					
				})
				.when('/forbidden', {
					templateUrl: './templates/role/forbidden.html',
				})
				.otherwise({
					redirectTo: '/'
				});
			$resourceProvider.defaults.stripTrailingSlashes = false;
		}
	])
	.run(function($rootScope, $location, authService, roleService) {
		$rootScope.$on('$routeChangeStart', function() {
			
			if (authService.isLoggedIn()) {
				authService.getUser()
				.then(function(response) {
					var user = response.data;
					// console.log(user);
					if ($location.url() === '/' && user.role === 'ADMIN') {
						$location.path('/users');
					}

					if (!roleService.checkAccessToRoute(user.role, $location.url())) {
						window.location.href = 'http://team.binary-studio.com/profile/#/newuser';
					}
				});	
			} else if($location.url() !== '/') {
				$location.path('/');
			}
		});
	});