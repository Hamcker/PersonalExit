$(document).on("click", 'span[data-prg-date="datePicker"]', function () {   //,input[data-prg-date="datePicker"]
	datePickerFunc(this);
});


var mapp = angular.module('myPapersApp', []);
mapp.controller('newPaperCtrl', function ($scope) {});
angular.bootstrap(document, ['myPapersApp']);

$('#personalCode').focusout(function (ev) {
	$.post('getUserInfo', { personalCode: $('#personalCode').val() }, function (d, s, j) {
		console.log(d);
		var scope = angular.element($('#regModal')).scope();
		scope.$apply(function () {
			scope.data = d[0];
		})
	});
});