var myMusic=$('audio')[0];
function playTime(time){
	if(time<10){
		time='0'+time
		return time
	}else{
		time=time
		return time
	}
}
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
	songTime()
	$('.play .btn2').removeClass('inactive').siblings().addClass('inactive');

}
function pause() {
	myMusic.pause();
	clearInterval(t)
		$('.play .btn1').removeClass('inactive').siblings().addClass('inactive');
}
function getChannel(){
	$.ajax({
		url:'http://api.jirengu.com/fm/getChannels.php',
		dataType: 'json',
		type: 'post',
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
getChannel()
function getmusic(){
	$.ajax({
		url:'http://api.jirengu.com/fm/getSong.php',
		dataType: 'json',
		type: 'post',
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
					$('audio').attr('sid',sid);
	       			$('audio').attr('ssid',ssid);
					$('audio').attr('src',url);
					$('.main-image').attr('src',bgPic);
					$('.main-music').text(title);
					play();
					getLyrics();
		}
	})
}
var myAudio=$('audio')[0]
function getLyrics(){
	var sid=$('audio').attr('sid');
	$.post('http://api.jirengu.com/fm/getLyric.php',{sid:sid},function(lyr){
		var lyr=JSON.parse(lyr);
		if(!!lyr.lyric){
		$('.music-lyric .lyric').empty();
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
		songTime()
}
	})	
}
function renderLyric(){
	var lyrLi = "";
    for (var i = 0; i < lyricArr.length; i++) {
        lyrLi += "<li data-time='"+lyricArr[i][0]+"'>"+lyricArr[i][1]+"</li>";
    }
    $('.music-lyric .lyric').append(lyrLi);
    setInterval(showLyric,100);//怎么展示歌词
}
function showLyric(){
    var liH = $(".lyric li").eq(5).outerHeight()-3; //每行高度
    for(var i=0;i< lyricArr.length;i++){//遍历歌词下所有的li
        var curT = $(".lyric li").eq(i).attr("data-time");//获取当前li存入的当前一排歌词时间
        var nexT = $(".lyric li").eq(i+1).attr("data-time");
        var curTime = myAudio.currentTime;
        if ((curTime > curT) && (curT < nexT)){//当前时间在下一句时间和歌曲当前时间之间的时候 就渲染 并滚动
            $(".lyric li").removeClass("active");
            $(".lyric li").eq(i).addClass("active");
            $('.music-lyric .lyric').css('top', -liH*(i-2));
        }
    }

}

var $soundControl=$('.sound-control');
var $soundPoint=$('.sound-point');
$soundPoint.on('mousedown',function(event){
	var $cur = $(this);
  var oldX = event.clientX;

  var left= parseInt($cur.css('left'));
  document.onmousemove = function(event) {
      	var x=event.clientX-oldX;
		var leftX=left+x;
		 $cur.css({
			left: leftX
		})
	    if ( parseInt($cur.css('left'))<=0) {
			leftX=0;
			$cur.css({
				left: 0
			})
		  }
	   	else  if (parseInt($cur.css('left'))>=208) {
			leftX=208;		
			$cur.css({
				left: 208
			})
	    }

		 myMusic.volume=1-parseFloat(leftX/208);			
	}
        document.onmouseup = function (event) {
            document.onmouseup = null;
            document.onmousemove = null;
        }
	
})    
var $timePoint=$('.time-point');
var $timeLine=$('.time-line');
function songTime(){
	setTimeout(function(){
		var songDuration=myMusic.duration;
		var songM=parseInt(songDuration/60);
		var songS=parseInt(songDuration%60);
		$('.stop-time').text((playTime(songM)+':'+playTime(songS)))
	},2000)
	t=setInterval(function(){
	var songTime=$('.start-time').text();
	var timeArray=songTime.split(':');
	var runM=timeArray[0]*60
	var runS=timeArray[1]
	var runTime=parseInt(runM)+parseInt(runS)
		setTime()
	},100)

}
function setTime(){
	var nowTime=myMusic.currentTime;
	var songDuration=myMusic.duration;
			$timePoint.css({
			width: nowTime/songDuration*360
		})
		var nowM=parseInt(nowTime/60);
		var nowS=parseInt(nowTime%60);
		var nowText=playTime(nowM)+':'+playTime(nowS)
		$('.start-time').text(nowText)
}
$timeLine.click(function(event){
	var lineX=event.offsetX;
	console.log(lineX)
	var songDuration=myMusic.duration;
	var nowTime=(lineX)/360*songDuration;
	myMusic.currentTime=nowTime;
	setTime()
	getLyrics()
})
setInterval(function(){
	if(myMusic.currentTime==myMusic.duration){
	getmusic();	
	}
},1000)
var a=0;
$('.nav').click(function(){
	a++;
	if(a%2===0){
		$('.music-lyric').removeClass('inactive');
	}
	else {
		$('.music-lyric').addClass('inactive');
	}
})

	
