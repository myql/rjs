(function(){
function goTop($el){
	this.$el=$el;
	this.init();
}
goTop.prototype={
	init: function(){
		var _this=this;
		$(window).on('scroll',function(){
				var windowTop=$(window).scrollTop();
				var goHeight=_this.$el.offset().top;
				var $goTop=$('#go-top');
				if(windowTop>=goHeight) {
					$goTop.removeClass('inactive');
				}else {
					$goTop.addClass('inactive');
				}
				$goTop.on('click',function(){
					$(window).scrollTop(0);
				})
})
	}
}
$.fn.gotop=function(){
	this.each(function(){
		new goTop($(this))
	})
}
})()
