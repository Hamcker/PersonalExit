$(document).on("click", 'span[data-prg-date="datePicker"]', function () {   //,input[data-prg-date="datePicker"]
	datePickerFunc(this);
});

$('#btnReg').click(function (ev) {
	ev.preventDefault();

	$.post('home/register', $('#newPaperForm').serializeArray(), function (d, s, j) {
		var scope = angular.element($('.notificationsHost')).scope();

		if (d == 'f' || s == 'fail') {
			scope.$apply(function () {
				scope.alerts.push({
					helperClass: "alert-error",
					text: "ثبت برگه با خطا مواجه شد، لطفاً دوباره سعی کنید."
				});
			});
		}
		else {
			scope.$apply(function () {
				scope.alerts.push({
					helperClass: "alert-info",
					text: "درخواست خروج موقت شخصی ثبت شد. لطفاً منتظر بررسی مسئولین مربوط باشید."
				});
			});
			$('#regModal').modal('hide');
			refreshGrid();
		}
	})
});

$(function () {
	$(".papersHost").on("click", "a.edit", function (ev) {
		ev.preventDefault();

	})

	$(".papersHost").on("click", "a.delete", function (ev) {
		ev.preventDefault();
		$.post('home/delete', { paperid: $(this).data('paperid') }, function (d, s, j) {
			refreshGrid();
		});
	})
});

$(document).ready(function () {
	// if (peAppModule == null) {
	// 	console.warn('injector is null!!!');
	// 	peAppModule = angular.module('peApp', []);
	// 	peAppModule.controller('newPaperCtrl', function ($scope) { });
	// 	peAppModule.controller('alertsCtrl', function ($scope) { $scope.alerts = [] });
	// 	peAppModule.controller('papersCtrl', function ($scope) { $scope.papers = [] });
	// 	angular.bootstrap(document, ['myPapersApp']);
	// } else {
		var injector = angular.injector(['ng']);
		console.log(injector);
		var $compile = injector.get('$compile');
		console.log($compile);
		$compile($("#subpageContainer").contents())({papers : []});
		//peAppModule = angular.module('peApp',[]);
		
		peAppModule.controller('newPaperCtrl', function ($scope) { console.log($scope);});
		peAppModule.controller('alertsCtrl', function ($scope) { $scope.alerts = [] });
		peAppModule.controller('papersCtrl', function ($scope) {console.log($scope);  $scope.papers = [] });
		
	// }
});


// 
// $('#personalCode').focusout(function (ev) {
// 	$.post('getUserInfo', { personalCode: $('#personalCode').val() }, function (d, s, j) {
// 		console.log(d);
// 		var scope = angular.element($('#regModal')).scope();
// 		scope.$apply(function () {
// 			scope.data = d[0];
// 		})
// 	});
// });

function refreshGrid() {
	$.get('/home/getPapers', function (d, s, j) {
		var scope = angular.element($('.papersHost')).scope();
		scope.$apply(function () {
			scope.papers = d;
		});
	});
}

$(document).ready(function () {
	refreshGrid();
});