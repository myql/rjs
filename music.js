var myMusic=$('audio')[0];
$('.play').click(function(){
	if(myMusic.paused){
		play()
	}else {
		pause()
	}
})
$('.forward').click(function(){
	getmusic()
})
$('.back').click(function(){
	getChannel();
})
function play(){
	myMusic.play();
	$('.play .btn2').removeClass('inactive').siblings().addClass('inactive');
}
function pause() {
	myMusic.pause();
		$('.play .btn1').removeClass('inactive').siblings().addClass('inactive');
}
function getChannel(){
	$.ajax({
		url:'http://api.jirengu.com/fm/getChannels.php',
		dataType: 'json',
		type: 'get',
		success: function(response){
			var  channels=response.channels;
			var num=Math.floor(Math.random()*channels.length);
			var channelname=channels[num].name;
			var channelId=channels[num].channel_id;
			$('.record').text(channelname);
			$('.record').attr('title',channelname);
			$('.record').attr('data-id',channelId);
			getmusic();
		}
	})
}
getmusic()
function getmusic(){
	$.ajax({
		url:'http://api.jirengu.com/fm/getSong.php',
		dataType: 'json',
		type: 'get',
		data: {
			'channel': $('.record').attr('data-id')
		},
		success: function(ret){
			var resource=ret.song[0],
					url=resource.url,
					bgPic=resource.picture,
					sid=resource.sid,
					ssid=resource.ssid,
					title=resource.title,
					lyrics=resource.lyric,
					author=resource.artist;
					$('audio').attr('src',url);
					$('.main-image').attr('src',bgPic);
					$('.main-music').text(title);
					play();
					getLyrics();
		}
	})
}
function getLyrics(){
	var sid=$('audio').attr('sid');
	$.get('http://api.jirengu.com/fm/getLyric.php',{sid:sid},function(lyr){
		var lyr=JSON.parse(lyr);
		var line=lyr.lyric.split('\n')
		var timeReg=/\[\d{2}:\d{2}.\d{2}\]/g;
		var result=[];
		if(line!==''){
			for(var i in line){
				var time=line[i].match(timeReg);
				var value=line[i].replace(timeReg,'');
				for(j in time){
					var t=time[j].slice(1,-1).split(':')
					var timeArr=parseInt(t[0],10)*60+parseFloat(t[1]);
					result.push([timeArr,value])
				}
			}
		}
		result.sort(function(a,b){
			return a[0]-b[0]
		});
		lyricArr=result;
	renderLyric()
	})	
}
function renderLyric(){
	var lyrLi='';
	for(var i=0;i<lyricArr.lenght;i++){
		lyrLI+="<li data-time='"+lyricArr[i][0]+"'+lyricArr[i][1]"+"</li>";
		$('.music-lyric' ).append(lyrLi);
		setInterval(showLyric,100);
	}
}
function showLyric(){
    var liH = $(".music-lyric li").eq(5).outerHeight()-3; 
    for(var i=0;i< lyricArr.length;i++){
        var curT = $(".music-lyric li").eq(i).attr("data-time");//获取当前li存入的当前一排歌词时间
        var nexT = $(".music-lyric li").eq(i+1).attr("data-time");
        var curTime = myAudio.currentTime;
        if ((curTime > curT) && (curT < nexT)){//当前时间在下一句时间和歌曲当前时间之间的时候 就渲染 并滚动
            $(".music-lyric li").removeClass("active");
            $(".music-lyric li").eq(i).addClass("active");
            $('.music-lyric').css('top', -liH*(i-2));
        }
    }

}