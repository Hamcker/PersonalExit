var funcs = [
	function () {
		$.get('/myPapers',function(d,s,x){
			$('#subpage').html(d);
		});
	},
	function () {
		$.get('/papersToSign',function(d,s,x){
			$('#subpage').html(d);
		});
	}
]

$(function () {
	$("a").click(function (event) {
		event.preventDefault();
		$('div a span').removeClass('current');
		$(this).children('span').addClass('current');
		console.log($(this).data('page'));
		funcs[$(this).data('page')]();
		
	});
});

particlesJS.load('particles-js', '/particlesjs-config.json', function () {
	console.log('callback - particles.js config loaded');
});