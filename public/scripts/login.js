function login(){
	console.log($('#loginForm').serializeArray());
	$.post('login', $('#loginForm').serializeArray(), function(d,s,x) {
		$('#page').html(d);
	})
}

particlesJS.load('particles-js', '/particlesjs-config.json', function() {
  console.log('callback - particles.js config loaded');
});