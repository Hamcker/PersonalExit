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

	if (bootstrapInjector == null || true) {
		console.warn('bootstraping');
		console.log(bootstrapInjector);
		var mapp = angular.module('peApp', []);
		mapp.controller('newPaperCtrl', function ($scope) { });
		mapp.controller('alertsCtrl', function ($scope) { $scope.alerts = [] });
		mapp.controller('papersCtrl', function ($scope) { $scope.papers = [] });

		// bootstrapInjector = angular.bootstrap(document, ['myPapersApp']);
	}
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