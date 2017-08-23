;
(function($, banners, next, prev) {
	var banners = $(banners),
		next = $(next),
		prev = $(prev),
		len = banners.length,
		num = 0,
		control = '<div class="controls"></div>',
		oi = '<i></i>',
		timer = null;
	$(banners).parents('#banner').find('.layout').prepend(control);
	$.each(banners, function(i) {
		$('.controls').append(oi);
		if (len == 0) {
			$('.controls i').eq(0).addClass('now')
		}
	});
	var controls = $('.controls i');
	if (controls.length == 1) {
		controls.hide();
	}
	run(0);
	autoPlay(num);
	$(banners, controls).on({
		mouseover: function() {
			clearInterval(timer);
		},
		mouseout: function() {
			num = controls.parent().find('.now').index();
			autoPlay(num);
		}
	});
	controls.on('click', function() {
		clearInterval(timer);
		num = $(this).index();
		run(num);
	});
	next.on('click', function() {
		clearInterval(timer);
		num = controls.parent().find('.now').index();
		brNext(num);
	});
	prev.on('click', function() {
		clearInterval(timer);
		num = controls.parent().find('.now').index();
		brprev(num);
	});

	function init(i) {
		controls.eq(i).addClass('now').siblings().removeClass('now');
		banners.eq(i).stop().animate({
			'opacity': 1
		}, 300).siblings().stop().animate({
			'opacity': 0
		}, 300);
	};

	function run(cur_i) {
		init(cur_i);
		banners.each(function(i, ele) {
			banners.eq(i).css('z-index', i >= cur_i ? len - i + cur_i : cur_i - i);
		});
	};

	function autoPlay(num) {
		timer = setInterval(function() {
			num++;
			if (num >= len) {
				num = 0;
			};
			run(num);
		}, 3000);
	};

	function brNext(n) {
		n++;
		n >= len ? n = 0 : n;
		run(n);
	};

	function brprev(n) {
		n--;
		n <= -1 ? n = len - 1 : n;
		run(n);
	}
})(jQuery, '#banner li', '#banner .next', '#banner .prev');;
(function($, box, item) {
	function boxmove() {
		$(item).show();
		$(item).first().slideUp(1000, function() {
			$(box).append($(item).first());
		});
	}
	timer = setInterval(boxmove, 3000);
})(jQuery, '.announcement-slideup', '.announcement-slideup li');


;
(function($, prev, next, oul) {
	var prev = $(prev),
		next = $(next),
		oul = $(oul),
		oliw = $(oul).find('li').outerWidth(true);
	next.on('click', function() {
		oul.stop().animate({
			'margin-left': -oliw
		}, 500, function() {
			$(oul).find('li').eq(0).appendTo(oul);
			oul.css({
				'margin-left': 0
			});
		});
	});
	prev.on('click', function() {
		oul.find('li:last').prependTo(oul);
		oul.css({
			'margin-left': -oliw
		});
		oul.stop().animate({
			'margin-left': 0
		}, 500);
	});
})(jQuery, '.cooperative .prev', '.cooperative .next', '.cooperative ul');

;
(function($) {
	var arr = [],
		chper = [],
		flag = 'off';
	$(window).scroll(function() {
		if (flag == 'off') {
			if ($(window).scrollTop() > 400 && $(window).scrollTop() < 1300) {
				$('.investment li').each(function(i) {
					if ($(this).find('canvas').length > 0) {
						arr[i] = $(this).find('canvas').attr('id');
						chper[i] = $(this).find('canvas').data('pre');
						new CircleProgress({
							element: document.getElementById(arr[i]),
							circleLineWidth: 3,
							backgroundColor: '#ededed',
							circleColor: '#f65d33',
							current: chper[i] == '0.00' ? 0 : chper[i],
							progressEndWidth: 32,
							progressEndHeight: 32,
						});
					} else {
						return;
					}
				});
				flag = 'on';
			}
		} else {
			return false;
		}
	});
})(jQuery);

window.onload = function() {
	var oPic = document.getElementById('pic');
	var oPrev = getByClass(oPic, 'prev')[0];
	var oNext = getByClass(oPic, 'next')[0];

	var aLi = oPic.getElementsByTagName('li');

	var arr = [];

	for (var i = 0; i < aLi.length; i++) {
		var oImg = aLi[i].getElementsByTagName('img')[0];

		arr.push([parseInt(getStyle(aLi[i], 'left')), parseInt(getStyle(aLi[i], 'top')),
			getStyle(aLi[i], 'zIndex'), oImg.width, parseFloat(getStyle(aLi[i], 'opacity') * 100)
		]);
	}


	oPrev.onclick = function() {
		arr.push(arr[0]);
		arr.shift();
		for (var i = 0; i < aLi.length; i++) {
			var oImg = aLi[i].getElementsByTagName('img')[0];

			aLi[i].style.zIndex = arr[i][2];
			startMove(aLi[i], {
				left: arr[i][0],
				top: arr[i][1],
				opacity: arr[i][4]
			});
			startMove(oImg, {
				width: arr[i][3]
			});
		}

	}

	oNext.onclick = function() {
		arr.unshift(arr[arr.length - 1]);
		arr.pop();
		for (var i = 0; i < aLi.length; i++) {
			var oImg = aLi[i].getElementsByTagName('img')[0];

			aLi[i].style.zIndex = arr[i][2];
			startMove(aLi[i], {
				left: arr[i][0],
				top: arr[i][1],
				opacity: arr[i][4]
			});
			startMove(oImg, {
				width: arr[i][3]
			});
		}
	}

	function getStyle(obj, name) {
		if (obj.currentStyle) {
			return obj.currentStyle[name];
		} else {
			return getComputedStyle(obj, false)[name];
		}
	}
}

function getByClass(oParent, sClass) {
	var aResult = [];
	var aEle = oParent.getElementsByTagName('*');

	for (var i = 0; i < aEle.length; i++) {
		if (aEle[i].className == sClass) {
			aResult.push(aEle[i]);
		}
	}
	return aResult;
}