/* global Calendar */

// function refreshGrid() {
// 	$.get('/home/getPapers', function (d, s, j) {
// 		var scope = angular.element($('.papersHost')).scope();
// 		scope.$apply(function () {
// 			scope.papers = d;
// 		});
// 	});
// }

Calendar.setup({
	inputField: "dateInput",   // id of the input field
	button: "datePickerbtn",   // trigger for the calendar (button ID)
	ifFormat: "%Y-%m-%d",       // format of the input field
	dateType: 'jalali',
	weekNumbers: false
});

$('#fromDate').timeEntry($.timeEntry.regionalOptions['fa']);
$('#toDate').timeEntry($.timeEntry.regionalOptions['fa']);
