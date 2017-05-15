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
		
	})
}