angular.module("peApp", ['ui.router'])
	.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
		$locationProvider.html5Mode(true);
		$stateProvider
			.state('login', {
				url: '/',
				views: {
					"main": {
						templateUrl: '/tmpl/login',
						controller: 'loginCtrl'
					}
				}
			})
			.state('home', {
				url: '/home',
				views: {
					"main": {
						templateUrl: '/tmpl/home',
						controller: 'homeCtrl'
					}
				}
			})
			.state('home.myPapers', {
				url: '/myPapers',
				views: {
					// "main@": {
					// 	templateUrl: '/tmpl/home',
					// 	controller: 'homeCtrl'
					// },
					"subpage": {
						templateUrl: '/tmpl/home/myPapers',
						controller: 'myPapersCtrl'
					}
				}
			})
			.state('home.papersToSign', {
				url: '/papersToSign',
				views: {
					// "main@": {
					// 	templateUrl: '/tmpl/home',
					// 	controller: 'homeCtrl'
					// },
					"subpage": {
						templateUrl: '/tmpl/home/papersToSign',
						controller: 'papersToSignCtrl'
					}
				}
			});

		// $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
		// 	//event.preventDefault();
		// 	console.log('state is changing');
		// 	console.log(arguments);
		// })
    })






	.controller('loginCtrl', function ($scope, $state) {
		$scope.test = 'شما'
		$scope.login = function () {
			$.post('/api/login', $('#loginForm').serializeArray(), function (d, s, x) {
				console.log('login result is: ' + d);
				if (d.status == "ok")
					$state.go('home');
				else
					$scope.message = 'نام کاربری یا رمز عبور صحیح نمی باشد، لطفاً دوباره سعی کنید.'
			})
		}
	})







	.controller('homeCtrl', function ($scope) {
	})










	.controller('myPapersCtrl', function ($scope, $http) {
		$scope.alerts = [];
		$scope.papers = [];
		$scope.toHour = "",
		$scope.fromHour = "",
		$scope.Date = "1394/08/04"

		var refreshGrid = function () {
			$http.get('api/getPapers').success(function (d) {
				$scope.papers = d;
			})
		}

		$scope.refreshGrid = refreshGrid;
		
		refreshGrid();

		var clear = function () {
			$scope.fromHour = "";
			$scope.toHour = "";
		}

		$scope.register = function () {
			var data = {};
			$('#newPaperForm').serializeArray().map(function (x) { data[x.name] = x.value });

			$http.post('api/register', data).success(function (d) {
				if (d == 'f') {
					$scope.alerts.push({
						helperClass: "alert-error",
						text: "ثبت برگه با خطا مواجه شد، لطفاً دوباره سعی کنید."
					});
				}
				else {
					$scope.alerts.push({
						helperClass: "alert-info",
						text: "درخواست خروج موقت شخصی ثبت شد. لطفاً منتظر بررسی مسئولین مربوط باشید."
					})

					clear();
					refreshGrid();
				}

				$('#regModal').modal('hide');
			});
		}

		$scope.edit = function (paper) {
			$scope.fromHour = paper.fromHour;
			$scope.toHour = paper.toHour;
			$scope.Date = paper.Date;
			$('#regModal').modal('show');
		}

		$scope.delete = function (self) {
			console.log(self);
			var scope = angular.element($('.papersHost')).scope();
			$http.post('api/delete', { paperid: self })
				.success(function () {
					scope.refreshGrid();
				});
		}
	})









	.controller('alertsCtrl', function ($scope) {
		$scope.alerts = []
	})
	.controller('newPaperCtrl', function ($scope) {

	})
	.controller('papersToSignCtrl', function ($scope) {

	})



function copyObj(s, t) {
	for (var x in s)
		if (s.hasOwnProperty(x)) t[x] = s[x];
}