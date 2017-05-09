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
var $header=$('.header');
var $headerLine=$('.header-line');
var $line=$('.line');
var $lineCross=$('.line-cross');
var $headerList=$('.header-list');
$header.height(50)
var windowHeight=$(window).height();
$line.on('click',function(){
	$lineCross.removeClass('inactive');
	$line.addClass('inactive');
	$headerList.removeClass('inactive');
	$header.height(windowHeight)
})
$lineCross.on('click',function(){
	$lineCross.addClass('inactive');
	$line.removeClass('inactive');
	$headerList.addClass('inactive');
	$header.height(50)
})


var $skillsShow=$('.skills-show');
var $skillsDes=$('.skills-des');
var desHeight=$skillsDes.height();
var showHeight=$skillsShow.height();
var skillsHeight=desHeight+showHeight;
console.log('w'+skillsHeight)
$(window).resize(function(){
	var windowHeight=$(window).height();
	if(windowHeight>=skillsHeight){
		var desHeights=windowHeight-showHeight;
		$skillsDes.height(desHeights);
		console.log(desHeights)
		console.log(skillsHeight)
	}else {
		$skillsDes.height(desHeight);
	}
})

