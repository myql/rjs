(function(){
function waterFall($ct){
	this.$ct=$ct;
	this.bind()
	this.play()
	this.init()
}
waterFall.prototype={
	bind: function(){
		$ct=this.$ct;
		$ctList=this.$ctList=$ct.children();
		this.ctWidth=$ctList.outerWidth(true);	
	},
	init: function(){
	var _this=this;
		$(window).on('resize',function(){
			_this.play()
	})
	},
	play: function(){
		var _this=this;
		this.initData();
		this.$ctList.each(function(){
		var $ct=$(this);
		
		var ctHeight=$ct.outerHeight(true);
		var obj=_this.getIndexOfMin(_this.sum);
		idx=obj.idx;
		min=obj.min;
		$ct.css({
			left: _this.ctWidth*idx,
			top: min
		})
		_this.sum[idx]=_this.sum[idx]+ctHeight;
	})
},
initData: function(){
	this.windowWidth=$(window).width();
			this.sum=[];
			this.sumlength=parseInt(this.windowWidth/this.ctWidth);
			this.$ct.width(this.sumlength*this.ctWidth)
	for(var i=0;i<this.sumlength;i++){
		this.sum[i]=0;
	}
},
getIndexOfMin: function(arr){
	var idx=0,min=arr[0];
	for(var i=0;i<arr.length;i++){
			if(arr[i]<min){
				idx=i;
				min=arr[i];
			}
		}
		return {min: min,idx: idx}
}
}
$.fn.waterfall=function($ct){
	this.each(function(){
		new waterFall($(this));
	})
}
})()