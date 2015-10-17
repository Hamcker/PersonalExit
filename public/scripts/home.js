var funcs = [
	function () {
		$.get('/home/myPapers', function (d, s, x) {
			$('#subpage').html(d);
			//window.history.pushState(d, 'myPapers', 'home/myPapers');
		});
	},
	function () {
		$.get('/home/papersToSign', function (d, s, x) {
			$('#subpage').html(d);
		});
	}
]

$(function () {
	$("a[data-page]").click(function (event) {
		event.preventDefault();
		$('div a span').removeClass('current');
		$(this).children('span').addClass('current');
		funcs[$(this).data('page')]();
	});
});

particlesJS.load('particles-js', '/particlesjs-config.json', function () {
	console.log('callback - particles.js config loaded');
});