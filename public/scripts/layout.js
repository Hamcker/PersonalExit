// var peAppModule = angular.module('peApp', ['ngRoute'])
// 	.config(function ($routeProvider, $locationProvider) {
// 		$routeProvider
// 			.when('/login', {
// 				templateUrl: '/login'
// 			}).when('/home', {
// 				templateUrl: '/home'
// 			}).when('/home/myPapers', {
// 				templateUrl: 'home/myPapers',
// 				controller: 'myPapersCtrl'
// 			});
// 
// 		$locationProvider.html5Mode(true);
// 	}).run(function ($location) {
// 		//$location.url('/login');
// 	});

var peAppModule = angular.module('peApp', ['ui.router']);

peAppModule.config(function ($stateProvider, $urlRouteProvider) {
	$stateProvider
		.state('root', {
			url: '/',
			templateUrl: '/',
			controller: 'loginCtrl'
		})
		.state('root.home', {
			url: '/home',
			templateUrl: '/home',
			controller: 'homeCtrl'
		})
		.state('root.home.myPapers', {
			url: '/myPapers',
			templateUrl: '/home/myPapers',
			controller: 'myPapersCtrl'
		})
		.state('root.home.papersToSign', {
			url: '/papersToSign',
			templateUrl: '/home/papersToSign',
			controller: 'papersToSignCtrl'
		})
})

peAppModule
	.controller('loginCtrl', function ($scope,$state) {
		
	})

peAppModule.run(function ($state) {
	console.log('$state is :');
	console.log($state);
})