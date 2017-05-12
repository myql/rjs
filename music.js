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
		Method: 'get',
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
function getmusic(){
	$.ajax({
		url:'http://api.jirengu.com/fm/getSong.php',
		dataType: 'json',
		Method: 'get',
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
					author=resource.artist;
					$('audio').attr('src',url);
					$('.main-image').attr('src',bgPic);
					play();
		}
	})
}