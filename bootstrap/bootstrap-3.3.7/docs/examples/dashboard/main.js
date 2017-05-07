var $sideBar=$('.sidebar');
var $rows=$('.rows');
var $row=$('.main-project');
var $section2=$('#section-2');
var $content=$('.content');
$section2.height($row.height());
function size(){
	if($(window).width()>=768){
		play();
		var contentWidth=$(window).width()-$('.aside').width();
		$rows.outerWidth(contentWidth);	
		$rows.css({
				left: '150px'
			})		
		
	}
	else if($(window).width()<768) {
		$rows.width($(window).width())
		$rows.css({
				left: 0
			})
	}
}	
size();
$(window).on('resize',function(){
		size()
})
function play(){
	
	$sideBar.children().on('click',function(){
	var $cur=$(this);
	console.log(1);
	var idx=$cur.index();
	$cur.addClass('active').siblings().removeClass('active');
})

}

