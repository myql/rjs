

var clock;
$(window).on('scroll', function(){
  //�û������ֹ���һ�Σ��ж���¼���Ӧ������� setTimeout ��Ҫ��Ϊ���ܿ��ǣ�ֻ�����һ���¼���Ӧ��ʱ��ִ�� checkshow
  if(clock){
    clearTimeout(clock);
  }
  clock = setTimeout(function(){
    checkShow();
  }, 100);
});

// �û���һ�δ�ҳ�棬��δ�������ڵ�ʱ����Ҫִ��һ�� checkShow
checkShow();

//�ж�Ŀ�����û��
function isShow($el){
  var scrollH = $(window).scrollTop(),
      winH = $(window).height(),
      top = $el.offset().top;

  if(top < winH + scrollH){
    return true;
  }else{
    return false;
  }
}

//���ֵĻ��� ִ�� loadAndPlace
function checkShow(){
  if(isShow($('#load'))){
    loadAndPlace();			//
  }
}





// ��ȡ���ݣ����Ұڷ�λ��

var curPage = 1,
    perPageCount = 20;

function loadAndPlace(){
  $.ajax({
    url: 'http://platform.sina.com.cn/slide/album_tech', //�������ŵ� jsonp�ӿ�
    // type: 'get',
    dataType: 'jsonp',
    jsonp:"jsoncallback",
    data: {
      app_key: '1271687855',
      format:'json',
      size:'img',
      num: perPageCount,
      page: curPage
    }
  }).done(function(ret){
    if(ret && ret.status && ret.status.code === "0"){
      place(ret.data);   //�������û���⣬��ô���ɽڵ㲢�ڷź�λ��
    }else{
      console.log('get error data');
    }
  });
}



function place(nodeList){
  console.log(nodeList);
  var $nodes = renderData(nodeList);  //�ڵ����ɺ���ӵ�ҳ����

  var defereds = [];  //�����洢 defered ���������
  $nodes.find('img').each(function(){
    var defer = $.Deferred();
    $(this).load(function(){
      defer.resolve();
    });   //��ÿ��ͼƬ������ɺ�ִ�� resolve
    defereds.push(defer);
  });
  $.when.apply(null,defereds).done(function() { //�����е�ͼƬ��ִ�� resolve �󣬼�ȫ��ͼƬ���غ�ִ�����������
    console.log('new images all loaded ...');
    //���ڵ����ͼƬȫ�����غ���ʹ���ٲ������㣬�������ΪͼƬδ���� item �߶ȼ���������ٲ����߶ȼ��������
    waterFallPlace($nodes);
  });
}



// �ٲ���

var colSumHeight = [],
    nodeWidth = $('.item').outerWidth(true),
    colNum = parseInt($('#pic-ct').width()/nodeWidth);

for(var i=0; i<colNum; i++){
  colSumHeight.push(0)
}

function waterFallPlace($nodes){
  $nodes.each(function(){
    var $cur = $(this);
    //colSumHeight = [100, 250, 80, 200]

    var idx = 0,
        minSumHeight = colSumHeight[0];

    for(var i=0;i<colSumHeight.length; i++){
      if(colSumHeight[i] < minSumHeight){
        idx = i;
        minSumHeight = colSumHeight[i];
      }
    }

    $cur.css({
      left: nodeWidth*idx,
      top: minSumHeight,
      opacity: 1
    });

    colSumHeight[idx] = $cur.outerHeight(true) + colSumHeight[idx];
    $('#pic-ct').height(Math.max.apply(null,colSumHeight));
  });

}


//�����ݷ���ƴװ��DOM�ŵ�ҳ����
function renderData(items){
  var tpl = '',
      $nodes;
  for(var i = 0;i<items.length;i++){
    tpl += '<li class="item">';
    tpl += ' <a href="'+ items[i].url +'" class="link"><img src="' + items[i].img_url + '" alt=""></a>';
    tpl += ' <h4 class="header">'+ items[i].short_name +'</h4>';
    tpl += '<p class="desp">'+items[i].short_intro+'</p>';
    tpl += '</li>';
  }
  $nodes = $(tpl);
  $('#pic-ct').append($nodes);
  return $nodes;
}

//$(".top-bar").('scroll',function(){
//  if ($(window).scrollTop=)
//})

 $.fn.stick =function(handler){

   var $cur = this,
       curH = $cur.height(),
       curW = $cur.width(),
       offsetTop = $cur.offset().top,
       offsetLeft = $cur.offset().left;
       onChange = handler ||function(){};

   //��Ŀ��Ԫ�ؿ�¡һ������ռλ������Ŀ��Ԫ�� Position ��Ϊ fix�������ĵ���������ҳ������

   var $div = $cur.clone()
               .css('opacity',0)
               .insertBefore($cur)
                .hide();

   $(window).on('scroll', function(){
     var scrollTop = $(this).scrollTop();

     if(scrollTop >= offsetTop ){
       if(!isFixed()){
         setFixed();
         onChange.call($cur);
       }
     }else{
       if(isFixed()){
         unsetFixed();
       }
     }
   });

    function isFixed(){
      return !!$cur.data('data-fixed');
    }

    function setFixed(){
      $cur.attr('data-fixed', true)
          .css({
                'position': 'fixed',
                'top': 0,
                'left': offsetLeft,
                'width': curW,
                'margin': 0,
                'z-index': 9999
              });
      $div.show();

    }
    function unsetFixed(){
      $cur.removeAttr('data-fixed')
          .removeAttr('style');
      $div.hide();
    };

 };
$('.top-bar').stick();