	var windowWidth=$(window).width();
	if(windowWidth>=768){
		var contentWidth=$(window).width()-$('.sidebar').width();
		$('.content').width(contentWidth)
		$(window).on('resize',function(){
		var contentWidth=$(window).width()-$('.sidebar').width();
		$('.content').width(contentWidth)
		})	
	}else {
		$('.content').width($(window).width())	
	}

$(window).on('resize',function(){
	var windowWidth=$(window).width();
	if(windowWidth>=768){
		var contentWidth=$(window).width()-$('.sidebar').width();
		$('.content').width(contentWidth)
		$(window).on('resize',function(){
		var contentWidth=$(window).width()-$('.sidebar').width();
		$('.content').width(contentWidth)
		})	
	}else {
		$('.content').width(windowWidth)
		$(window).on('resize',function(){
		$('.content').width(windowWidth)
		})
	}
		})
		
