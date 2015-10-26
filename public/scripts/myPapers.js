$(document).on("click", 'span[data-prg-date="datePicker"]', function () {   //,input[data-prg-date="datePicker"]
	datePickerFunc(this);
});

$(function () {
// 	$(".papersHost").on("click", "a.edit", function (ev) {
// 		ev.preventDefault();
// 
// 	})
// 
// 	$(".papersHost").on("click", "a.delete", function (ev) {
// 		ev.preventDefault();
// 		$.post('home/delete', { paperid: $(this).data('paperid') }, function (d, s, j) {
// 			refreshGrid();
// 		});
// 	})
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

