function login(){
	$.post('login', $('#loginForm').serializeArray(), function(d,s,x) {
		$('#page').html(d);
		window.history.pushState(d,'home','home');
	})
}

particlesJS.load('particles-js', '/particlesjs-config.json', function() {
});