requirejs.config({
	baseUrl: './js',
	paths: {
		app: 'app'
	}
});
requirejs(['app'],function(app){
	app.hello()
})