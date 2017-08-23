;(function($,WeChat,weibo){
	var WeChat = $(WeChat),
		weibo = $(weibo);
		$(WeChat).hover(function(){
			if(!$(weibo).is(":animated")){
				$(weibo).find('div').hide();
			}
			$(this).find('div').stop().slideDown(400);
			},function(){
				$(this).find('div').stop().slideUp(400);
		});
		$(weibo).hover(function(){
			if(!$(WeChat).is(":animated")){
				$(WeChat).find('div').hide();
			}
			$(this).find('div').stop().slideDown(400);
			},function(){
				$(this).find('div').stop().slideUp(400);
		});
})(jQuery,'.WeChat','.weibo');
;(function($,btop){
	var btop = $(btop);
	btop.on('click',function(e){
		e.preventDefault(e);
		$('html,body').animate({ scrollTop:0},800);
	});
})(jQuery,'.backtop');

;(function($,invest){
	var invest = $(invest);
	invest.hover(function(){
		invest.children('ul').stop().show(300);
	},function(){
		invest.children('ul').stop().hide(300);
	});
})(jQuery,'.nav .nav_right .myinvest');

function clearNoNum(obj){
obj.value = obj.value.replace(/[^\d.]/g,"");
//必须保证第一个为数字而不是.
obj.value = obj.value.replace(/^\./g,"");
//保证只有出现一个.而没有多个.
obj.value = obj.value.replace(/\.{2,}/g,".");
//保证.只出现一次，而不能出现两次以上
obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
};

/*弹出层*/
/*
	参数解释：
	title	标题
	url		请求的url
	id		需要操作的数据id
	w		弹出层宽度（缺省调默认值）
	h		弹出层高度（缺省调默认值）
*/
function layer_show(w,h,title,url){
	if (title == null || title == '') {
		title=false;
	};
	if (url == null || url == '') {
		url="404.html";
	};
	if (w == null || w == '') {
		w=800;
	};
	if (h == null || h == '') {
		h=($(window).height() - 50);
	};
	layer.open({
		type: 2,
		area: [w+'px', h +'px'],
		fix: false, //不固定
		maxmin: true,
		shade:0.4,
		title: title,
		content: url
	});
}
/*关闭弹出框口*/
function layer_close(){
	var index = parent.layer.getFrameIndex(window.name);
	parent.layer.close(index);
}

;(function($,a,b){
	var a = $(a);
	var b = $(b);
	a.on('click',function(){
		var i = $(this).index();
		$(this).addClass('active').siblings().removeClass('active');
		b.hide();
		b.eq(i).show();
	});
})(jQuery,'.nav_block .nav_item','.nav_none_list');