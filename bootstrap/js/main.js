var $navbar=$('.navbar'),$navbarNav=$('.navbar-nav');
var $container=$('#container');
var $navbarBrand=$('.navbar-brand');
$navbarNav.children().on('click',function(){
		var idx=$(this).index();
		$navbarNav.children().removeClass('active').eq(idx).
		addClass('active');
	})
var windowTop=$(window).scrollTop();
if((windowTop)>10){
		$navbar.css({
		background: '#222'
	})	

	}else {
		$navbar.css({
		background: 'none'
		})	
	}
	

	for(var i=0;i<$container.children().length-1;i++){
	var divTop=$container.children().eq(i).offset().top;
	var divTop1=$container.children().eq(0).offset().top;
	if(windowTop>divTop){
		$navbarNav.children().removeClass('active').eq(i).addClass('active');
		
	}else if(windowTop<divTop1){
		$navbarNav.children().removeClass('active')
	}
}
$(window).scroll(function(){
	var windowTop=$(window).scrollTop();
	var headerTop=$('.header-content').offset().top;
	if((windowTop)>2){
		$navbar.css({
		background: '#222'
	})	
	}else {
		$navbar.css({
		background: 'none'
	})	
	}
	for(var i=0;i<($container.children().length-1);i++){
	var divTop=$container.children().eq(i).offset().top;
	var divTop1=$container.children().eq(0).offset().top;
	if((windowTop+$(window).height())>divTop){
		$navbarNav.children().removeClass('active').eq(i).addClass('active');
		
	}else if((windowTop+$(window).height())<divTop1) {
		$navbarNav.children().removeClass('active')
	}
	
}
})

$navbarNav.children().on('click',function(){
	
})

