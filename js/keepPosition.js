;(function($){
	/*
		author :longjia
		date   :2012/10/25 10:00
		params ��
			content:��sidebarͬ�����������򣬿�Ϊstring����jquery����
			margin:sidebar�Ƿ����margin��Ĭ�ϼ���
			range:���������������볬��rangeʱ��sidebar���Ź��������й�������Ϊstring����jquery����
		˵����
			��content����߶ȳ���sidebar����߶�ʱ��������ִ�� ����ie6��ʾЧ����̫���������ie6��֧��
		ʹ�ã�
			$(".sidebar").keepPosition({
				content:".content"//����Ϊ$(".content")
			});
	*/
	$.fn.keepPosition=function(o){
		o=$.extend(true,{
			content:".content",
			margin:false,
			range:null
		},o||{});
		if($.browser.msie&&$.browser.version<7) return;
		$(this).each(function(index){			
			var $this=$(this),flag=false,thisTop=$this.offset().top,thisHeight,thisMT=parseInt($this.css("margin-top"))||0,contentHeight,contentMT=parseInt($(o.content).css("margin-top"))||0,contentBottom,relativeTop=parseInt($this.css("top"))||0,thisMt=thisMT,mt=0;
			var f=1;
			if(o.margin){
				mt=thisMT;
				thisMt=0;
			}
			if(!o.range){
				o.range=contentBottom-thisHeight+thisMt;
			}else{
				if(typeof o.range !="number"){
					try{
						o.range=$(o.range).offset().top;
						f=2;
					}catch(e){
						o.range=contentBottom-thisHeight+thisMt;
					}
				}
			}
			var init=function(){
				thisHeight=$this.outerHeight(true);
				contentHeight=$(o.content).outerHeight(true);
				contentBottom=$(o.content).offset().top+contentHeight-contentMT;				
				if(f==1){
					o.range=contentBottom-thisHeight+thisMt;
				}
			};
			init();
			$("img",$this).load(function(){
				init();
			});
			$("img",$(o.content)).load(function(){						
				init();			
			});		
			var setPosition=function(){
				var top=$(window).scrollTop();
				var winHeight=$(window).height();
				if(top>=(thisTop-mt)&&top<o.range){
					$this.css({"position":"fixed","top":0-thisMt});
				}else{
					$this.removeAttr("style");
					flag=false;
				}				
				if(!flag){
					if(top>=o.range){
						if($this.parent().css("position")!="absolute"){
							$this.css({"position":"relative","top":relativeTop+(o.range-thisMt+thisMT-thisTop)});
						}else{
							$this.css({"top":relativeTop+(o.range-thisMt+thisMT-thisTop)});
						}
						flag=true;
					}
				}
			};
			var execute=function(){
				if(contentHeight>=thisHeight){
					setPosition();
					$(window).unbind("resize scroll",setPosition).bind("resize scroll",setPosition);
				}
			};
			execute();
		});
	};
})(jQuery)
