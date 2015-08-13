var Polls = angular.module('Polls', ['ngRoute']);

Polls.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: '../views/home.html',
			controller: 'mainController'
		})

		.when('/login', {
			templateUrl: '../views/login.html',
			controller: 'loginController'
		})

		.when('/register', {
			templateUrl: '../views/register.html',
			controller: 'regController'
		})

		.when('/polls', {
			templateUrl: '../views/polls.html',
			controller: 'pollController'
		})

		.when('/polls/new', {
			templateUrl: '../views/pollsNew.html',
			controller: 'pollNewController'
		});
});