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
					"subpage": {
						templateUrl: '/tmpl/home/myPapers',
						controller: 'myPapersCtrl'
					}
				}
			})
			.state('home.papersToSign', {
				url: '/papersToSign',
				views: {
					"subpage": {
						templateUrl: '/tmpl/home/papersToSign',
						controller: 'myPapersCtrl'
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
		$scope.test = ''
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
		$scope.Date = "1394-08-04"
		$scope.editMode = false;
		$scope._id = 0;

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
		$scope.clear = clear;

		$scope.register = function () {
			var data = {};
			$('#newPaperForm').serializeArray().map(function (x) { data[x.name] = x.value });

			$http.post($scope.editMode ? 'api/edit' : 'api/register', data).success(function (d) {
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

					$scope.clear();
					refreshGrid();
				}

				$('#regModal').modal('hide');
			});


		}

		$scope.edit = function (paper) {
			$scope.fromHour = paper.fromHour;
			$scope.toHour = paper.toHour;
			$scope.Date = paper.Date;
			$scope._id = paper._id;
			$('#regModal').modal('show');
			$scope.editMode = true;
		}

		$scope.delete = function (_id) {
			$http.post('api/delete', { paperid: _id })
				.success(function () {
					$scope.refreshGrid();
				});
		}

		$scope.up = function (paper) {
			$http.post('api/up', { paperid: paper._id })
				.success(function () {
					switch (paper.status) {
						case 0:
							paper.statusText = 'مورد تأیید مسئول واحد'
							break;
						case 1:
							paper.statusText = 'مورد تأیید کارگزینی'
							break;
						case 2:
							paper.statusText = 'مورد تأیید نگهبانی'
							break;
						case 3:
							paper.statusText = 'خارج شده'
							break;
						case 4:
							paper.statusText = 'بازگشته'
							break;
						case 5:
							paper.statusText = 'رد شده'
							break;
						case 6:
							paper.statusText = 'در حال بررسی'
							break;
					}
					paper.status = (paper.status + 1) % 7;
				});
		}
		$scope.down = function (paper) {
			$http.post('api/down', { paperid: paper._id })
				.success(function () {
					switch (paper.status) {
						case 2:
							paper.statusText = 'مورد تأیید مسئول واحد'
							break;
						case 3:
							paper.statusText = 'مورد تأیید کارگزینی'
							break;
						case 4:
							paper.statusText = 'مورد تأیید نگهبانی'
							break;
						case 5:
							paper.statusText = 'خارج شده'
							break;
						case 6:
							paper.statusText = 'بازگشته'
							break;
						case 0:
							paper.statusText = 'رد شده'
							break;
						case 1:
							paper.statusText = 'در حال بررسی'
							break;
					}
					if (paper.status == 0)
						paper.status = 6
					else
						paper.status--;
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