var $navbar=$('.navbar'),$navbarNav=$('.navbar-nav');
var $container=$('#container'),$services=$('#services'),$portfolio=$('#portfolio'),$about=$('#about'),$team=$('#team'),$contact=$('#contact');
var windowTop=$(window).scrollTop();
if((windowTop)>2){
		$navbar.css({
		background: '#222'
	})	
	}else {
		$navbar.css({
		background: 'none'
	})	
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
	for(var i=0;i<$container.children().length-1;i++){
	var divTop=$container.children().eq(i).offset().top;
	if(windowTop>divTop){
		$navbarNav.children().eq(i).addClass('active').siblings().removeClass('active');
		
	}
	
}
})

$navbarNav.children().on('click',function(){
		$navbarNav.children().removeClass('active');
		$(this).addClass('active');
	})
