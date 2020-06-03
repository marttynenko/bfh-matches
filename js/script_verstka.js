$.fn.extend({
	printElement: function() {
		var frameName = 'printIframe';
		var doc = window.frames[frameName];
		if (!doc) {
			$('<iframe>').hide().attr('name', frameName).appendTo(document.body);
			doc = window.frames[frameName];
		}
		doc.document.body.innerHTML = this.html();
		doc.window.print();
		return this;
	}
});

function letterize(el) {
	el.innerHTML =  el.innerHTML.replace(/(.)/g, '<span>$1</span>');
}

var timeend = new Date();
timeend = new Date(2021, 4, 6);
function champTimer() {
  var today = new Date();
  today = Math.floor((timeend-today)/1000/60/60/24);
  today = String(today);
  strtoday = today.replace(/(.)/g, '<span>$1</span>');
  $('.champ-days-left').html(strtoday);
}


jQuery(document).ready(function($){

	if ($('.champ-days-left').length) {
		champTimer();
	}
	
	
	if (window.devicePixelRatio == 1) {
		$('html').addClass('no-retina');
	}

	$('.main-menu li').each(function(){
		var $this = $(this);
		if ($this.find('ul').length) {
			$this.addClass('childs-in')
		}
	});

	$('.print-link').on('click',function(){
		$('article').printElement();
	});


	//функция для навешивания изображений фоном
	function backgrounded (selector) {
		$(selector).each(function(){
			var $this = $(this),
			$src = $this.find('.bg').attr('src');
			$this.addClass('backgrounded').css('backgroundImage','url('+$src+')');
		});
	}
	backgrounded('.top-item .img a');
	backgrounded('.rectangle-item .img a');
	// backgrounded('.news-item .img > a');
	backgrounded('.side-news-item > a');
	backgrounded('.match-item');
	backgrounded('.side-menu a');
	backgrounded('.match-online');

	var slickMedia = $('.slick-media-line');
	slickMedia.each(function(){
		var $this = $(this);
		if ($this.find('.slide-media').length > 1) {
			$this.slick({
				infinite: false,
				arrows: true,
				slidesToShow: 1,
				dots: false,
				appendArrows: $('.media-line-arrows')
			});
		}
	});


	/*$('.slick-partners').slick({
		slidesToShow: 7,
		slidesToScroll: 1,
		arrows: true,
		dots: false,
		autoplay: true,
		autoplaySpeed: 5000
	});*/


	var slickSchedule = $('.slick-schedule');
	slickSchedule.slick({
		infinite: false,
		arrows: true,
		slidesToShow: 5,
		dots: false
	});



	$.datetimepicker.setLocale('ru');
	$('.datepicker').datetimepicker({
		i18n:{
		  ru:{
		   months:[
		    'Январь','Февраль','Март','Апрель',
		    'Май','Июнь','Июль','Август',
		    'Сентябрь','Октябрь','Ноябрь','Декабрь',
		   ],
		   dayOfWeek:[
		    "Вс", "Пн", "Вт", "Ср", 
		    "Чт", "Пт", "Сб", 
		   ]
		  }
		},
		mousewheel: false,
		scrollInput: false,
		scrollMonth: false,
		minDate: 0,
		dayOfWeekStart: 1,
		format:'d.m.Y',
		lang:'ru',
		timepicker:false
		/*onSelectDate:function(ct,$i){
		  $i.closest('.inp-date').find('.no-picker-txt').text($i.val());
		},
		onGenerate: function(current_time,$input){}*/
	});


	var slickSimple = $('.slick-simple');
	if(slickSimple.find('.item').length > 1) {
		slickSimple.slick({
			arrows: true,
			dots: false
		});
	}


	var slickRelated = $('.slick-related');
	slickRelated.slick({
		infinite: false,
		arrows: true,
		slidesToShow: 4,
		dots: false,
		appendArrows: $('.slick-related-arrows')
	});


	//плавающие соц кнопки
	if ( $('.float-share').length) {

		$(window).on('scroll', function(){
			var windowOffset = $(window).scrollTop(),
					floatOffset = $('.node-float-space').offset().top,
					contentHeight = $('.node').height(),
					floatHeight = $('.float-share').height(),
					floatStop = floatOffset + contentHeight - floatHeight;

			if (windowOffset > floatOffset && windowOffset < floatStop) {
				$('.float-share').addClass('float').removeClass('flip-bottom');
			} else {
				$('.float-share').removeClass('float').addClass('flip-bottom');

				if (windowOffset < floatStop) {
	        $('.float-share').removeClass('flip-bottom');
	    	}
			}
		});
	}//if end


	/*анимация карточки новости*/
	$(document).on('mouseenter', '.news-item', function(){
		var $this = $(this),
				txt = $this.find('.txt'),
				newsBody = $this.find('.body'),
				gutter;
		txt.css({
			'overflow':'initial',
			'maxHeight':'none'
		});
		gutter = txt.innerHeight() - 44;
		if (gutter >= 260) {
			gutter = 260;
		}
		if (gutter > 0) {
			$this.addClass('guttered');
			newsBody.stop().animate({
				'marginTop':-gutter
			},400);
		}
	});
	$(document).on('mouseleave', '.news-item', function(){
		var $this = $(this),
				txt = $this.find('.txt'),
				newsBody = $this.find('.body')
		if ($this.hasClass('guttered')) {
			newsBody.stop().animate({'marginTop':0},400);
			txt.css({
				'overflow':'hidden',
				'maxHeight':'44px'
			});
			$this.removeClass('guttered');
		}
	});


	$(document).on('click','.contact-group-title',function(){
		$(this).toggleClass('opened');
		$(this).next('.contact-group-body').slideToggle(200);
	});


	$(document).on('click','.to-poll-result',function(e){
		e.preventDefault();
		$('.mini-poll .block-body').slideUp(200);
		$('.mini-poll .poll-results').slideDown(200);
	});
	$(document).on('click','.to-poll-voting',function(e){
		e.preventDefault();
		$('.mini-poll .poll-results').slideUp(200);
		$('.mini-poll .block-body').slideDown(200);
	});

	$('.to-full-article').on('click',function(e){
		e.preventDefault();
		var span = $(this).find('span');
		if (span.text() === 'Читать полностью') {
			$('.article-hidden').slideDown(500);
			span.text('Свернуть полный текст');
		} else {
			$('.article-hidden').slideUp(500);
			span.text('Читать полностью');
		}
	});

	$('.to-all-couchs').on('click',function(e){
		e.preventDefault();
		var span = $(this).find('span');
		if (span.text() === 'Весь состав') {
			$('.hidden-couchs').slideDown(300);
			span.text('Свернуть весь состав');
		} else {
			$('.hidden-couchs').slideUp(300);
			span.text('Весь состав');
		}
	});

	//видеоплеер старница трансляций
	$(document).on('click', '.video-player:not(.playing)', function(e){
		e.preventDefault();
		var $this = $(this),
				$url = $this.attr('href'),
				$height = $this.innerHeight();
				$iframe = '<iframe width="100%" height="'+$height+'" '+
				'src="'+$url+'?autoplay=1" frameborder="0" '+
				'allowfullscreen autoplay="1"></iframe>';
		$this.addClass('playing').html($iframe);
		// $this.siblings('.descr').addClass('playing');
	});

	if ( $('.audio-player').length ) {
		var playerScript = document.createElement('script');
		playerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jplayer/2.9.2/jplayer/jquery.jplayer.min.js';
		document.body.appendChild(playerScript);

		playerScript.onload = function(){

			$('.audio-player').each(function(key){
		  	var aIndex = key + 1;
		  	$(this).attr('id','jplayer_'+key);
		  	$(this).next('.jp-audio').attr('id','jp_container_'+key);
		  	var playerItem = '#jplayer_'+key;
		  	var containerItem = '#jp_container_'+key;
		  	var playerSource = $(this).attr('source'),
		  	playerTitle = $(this).data('title');
		  	
		  	$(playerItem).jPlayer({
					ready: function () {
						$(this).jPlayer("setMedia", {
							title: playerTitle,
							mp3: playerSource
						});
					},
					play: function() { // To avoid multiple jPlayers playing together.
						$(this).jPlayer("pauseOthers");
					},
					supplied: "mp3, m4a, oga",
					wmode: "window",
					globalVolume: true,
					useStateClassSkin: true,
					autoBlur: false,
					smoothPlayBar: true,
					keyEnabled: true,
					verticalVolume: true,
					cssSelectorAncestor: containerItem
				});
		  });

		}
	}


	


	/*подсвечиваем ячейки таблиц*/
	$(document).on('mouseenter','.standings-table td, standings-table th',function(){
		var $this = $(this),
		$index = $(this).index(),
		$table = $(this).closest('table');
		$this.addClass('table-shadow');
		$this.parent('tr').siblings('tr').find('td:eq('+$index+')').addClass('table-shadow');
		$table.find('th').eq($index).addClass('table-shadow');
	});
	$(document).on('mouseleave','.standings-table td, standings-table th',function(){
		var $this = $(this),
		$table = $(this).closest('table');
		$table.find('th').removeClass('table-shadow');
		$table.find('td').removeClass('table-shadow');
	});






	//галлерея для фотографий
  $('body').lightGallery({
  	selector: '.lightgallery'
	});
	

	


  if(matchMedia) {
		var screen992 = window.matchMedia('(max-width:992px)');
		screen992.addListener(changes);
		changes2(screen992);

		var screen768 = window.matchMedia('(max-width:768px)');
		screen768.addListener(changes);
		changes(screen768);
	}
	function changes(screen768) {
		if(screen768.matches) {
			// console.log('<768');
		} else {
			// console.log('>768');
		}
	}

	function changes2(screen992) {
		if(screen992.matches) {
			// console.log('<992');
		} else {
		}
	}

	

	//Замена телефонов и email ссылками
	$('.phone-link, .tel').each(function(){
		var phone = $(this).text().replace(/[^+0-9]/g, '');
		$(this).wrapInner('<a href="tel:' + phone + '"></a>');
	});
	$('.mail-link').each(function(){
		var mail = $(this).text().replace(/\W\@/g, '');
		$(this).wrapInner('<a href="mailto:' + mail + '"></a>');
	});
	

	

	//разворачиваем панель меню
	$(document).on('click','.mm-toggler', function(){
		$(this).stop().toggleClass('opened');
		$('.mobile-menu').stop().toggleClass('opened');
		$('.m-overflow').stop().toggleClass('opened');
	});
	$(document).on('click','.m-overflow',function(){
		$(this).stop().removeClass('opened');
		$('.mobile-menu').stop().removeClass('opened');
		$('.mm-toggler').stop().removeClass('opened');
	});



	//разворачиваемые блоки
	$('.toggleDown').on('click',function(e){
		e.preventDefault();
		$(this).next('.toggledDiv').slideToggle(150);
	});


	//mfp для видео
  $('.mfp-video').magnificPopup({
    type: 'iframe',
    mainClass: 'magnific-video',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
  });
   

	
	//инициализация MFP popup для форм
	$(document).on('click','.ajax-mfp',function(){
		var a = $(this);
		$.magnificPopup.open({
			items: { src: a.attr('data-href') },
			type: 'ajax',    
			overflowY: 'scroll',
			removalDelay: 300,
			mainClass: 'my-mfp-zoom-in',
			ajax: {
				tError: 'Ошибка. <a href="%url%">Контент</a> не может быть загружен',
			},
			callbacks: {
				open: function () {
					setTimeout(function(){
						$('.mfp-wrap').addClass('not_delay');
						$('.white-popup').addClass('not_delay');
					},700);
				}
		  }
		});
		return false;
	});


	//стилизация элементов форм
  $(function() {
		$('input[type="checkbox"], input[type="radio"], input[type="file"], select').not('.not-styler').styler({
			singleSelectzIndex: '1',
		});
	});


	// $(function() {
    $.fn.scrollToTop = function() {
	    $(this).hide().removeAttr("href");
	    if ($(window).scrollTop() >= "350") $(this).fadeIn("slow")
	    var scrollDiv = $(this);
	    $(window).scroll(function() {
	     if ($(window).scrollTop() <= "350") $(scrollDiv).fadeOut("slow")
	     else $(scrollDiv).fadeIn("slow")
	    });
	    $(this).click(function() {
	     $("html, body").animate({scrollTop: 0}, "slow")
	    })
    }
  // });
	// $(function() {
	 $(".scroll-up").scrollToTop();
	// });


	if ($('.top-news .top-news-bg').length) {
		// $('img.top-news-bg').load(function(){
		
			let topNewsSrc = $('img.top-news-bg').attr('src');
			let topNewsblock = $('.top-news');
			topNewsblock.css('backgroundImage','url('+topNewsSrc+')');
			topNewsblock.addClass('js-bg-added');
		// });
			
	}


	//инициализация табов
	$('.tabs-pr-descrip a').tabs();



	var slickStore = $('.slick-store');
	slickStore.slick({
		slidesToShow: 4,
		slidesToScroll: 4,
		arrows: true,
		dots: false,
		appendArrows: $('.store-arrows'),
		infinite: false
	});

	$('.slick-social-photos').each(function(key,item){
		var currentClass = 'slick-social-'+(key+1);
		$(item).addClass(currentClass);
		$('.'+currentClass).slick({
			slidesToShow: 5,
			slidesToScroll: 5,
			dots: true,
			arrows: true,
			adaptiveHeight: true,
			infinite: false
		});
	});
	$('.slick-social-news').each(function(key,item){
		var currentClass = 'slick-social-news-'+(key+1);
		$(item).addClass(currentClass);
		$('.'+currentClass).slick({
			slidesToShow: 2,
			slidesToScroll: 2,
			dots: true,
			arrows: false,
			adaptiveHeight: true,
			infinite: false,
			responsive: [
				{
					breakpoint: 700,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}
			]
		});
	});
	setTimeout(function(){
		$('.tabs-social-photos a').tabs();
	},300);
	$('.top-players-tabs a').tabs();

	function blockBackgrounded (el) {
		var src = $(el).find('.bg').attr('src');
		$(el).css('backgroundImage','url('+src+')');
	}
	blockBackgrounded('.js-bg');

	$.fn.scrollToBottom = function() {
    $(this).hide().removeAttr("href");
    if ($(window).scrollTop() <= $('#footer').offset().top) $(this).fadeIn("slow")
    var scrollDiv = $(this);
    $(window).scroll(function() {
     if ($(window).scrollTop() >= $('#footer').offset().top) $(scrollDiv).fadeOut("slow")
     else $(scrollDiv).fadeIn("slow")
    });
    $(this).click(function() {
     $("html, body").animate({scrollTop: $('#footer').offset().top}, "slow")
    })
  }

	$(".arrow-to-top").scrollToTop();
	$('.arrow-to-bottom').scrollToBottom();



	$('.tabs-playoffs-menu a').tabs();


	$(document).on('click','.tabs-stage-menu a',function(e){
		e.preventDefault();
		if ($(this).hasClass('active')) return;
		if($('.to-tab-tables').hasClass('active')) {
			$('.tab-tables').fadeOut(100);
			$('.tab-playoffs').fadeIn(100);
			$('.tabs-stage-menu .tab-slider').addClass('active');
		} else {
			$('.tab-tables').fadeIn(100);
			$('.tab-playoffs').fadeOut(100);
			$('.tabs-stage-menu .tab-slider').removeClass('active');
		}
		$('.tabs-stage-menu a').toggleClass('active');
	});

	$(document).on('click','.tabs-stage-menu .tab-slider',function(){
		if($('.to-tab-tables').hasClass('active')) {
			$('.tab-tables').fadeOut(100);
			$('.tab-playoffs').fadeIn(100);
			$(this).addClass('active');
		} else {
			$('.tab-tables').fadeIn(100);
			$('.tab-playoffs').fadeOut(100);
			$(this).removeClass('active');
		}
		$('.tabs-stage-menu a').toggleClass('active');
	});


	$.urlParam = function(name, url){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(url);
    if (results==null){
       return null;
    }
    else{
       return decodeURI(results[1]) || 0;
    }
	}


	$(document).on('click','.popup-youtube',function(e){
		e.preventDefault();
		var $this = $(this),
				$src = $this.attr('href'),
				$start = '';
		if ($.urlParam('time_continue',$src) !== null) {
			$start = '?start='+$.urlParam('time_continue',$src)+'&';
		}
		// console.log($start);
		$.magnificPopup.open({
			items: {src: $src},
			type: 'iframe',
			iframe: {
				patterns: {
			    youtube: {
			      index: 'youtube.com/',
			      id: 'v=',
			      src: '//www.youtube.com/embed/%id%'+$start+'?autoplay=1'
			    }
			  }
			},
	    mainClass: 'magnific-video',
	    removalDelay: 160,
	    preloader: false,
	    fixedContentPos: false
		});
	});


	$('.tabs-structure a').tabs();




	var slickHSC = $('.slick-new-schedule');
	slickHSC.slick({
		slidesToShow: 6,
		infinite: false,
		responsive: [
			{
				breakpoint: 1180,
				settings: {
					slidesToShow: 5
				}
			}, {
				breakpoint: 992,
				settings: {
					slidesToShow: 4
				}
			}, {
				breakpoint: 768,
				settings: {
					slidesToShow: 3
				}
			}, {
				breakpoint: 567,
				settings: {
					slidesToShow: 2
				}
			}
		]
	});

	var slickTopNews = $('.slick-top-news');
	slickTopNews.slick({
		slidesToShow: 5,
		infinite: false,
		responsive: [
			{
				breakpoint: 1100,
				settings: {
					slidesToShow: 4
				}
			}, {
				breakpoint: 992,
				settings: {
					slidesToShow: 3
				}
			}, {
				breakpoint: 640,
				settings: {
					slidesToShow: 2
				}
			}, {
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					adaptiveHeight: true
				}
			}
		]
	});

	backgrounded('.news-compact-img > a');

	$('.slick-partners').each(function(key,item){
		var current = 'slick-partners-'+(+key+1);
		$(item).addClass(current);
		$('.'+current).slick({
			slidesToShow: 7,
			slidesToScroll: 1,
			arrows: true,
			dots: false,
			autoplay: true,
			autoplaySpeed: 5000,
			responsive: [
				{
					breakpoint: 1240,
					settings: {
						slidesToShow: 6
					}
				},
				{
					breakpoint: 1100,
					settings: {
						slidesToShow: 5
					}
				},
				{
					breakpoint: 950,
					settings: {
						slidesToShow: 4
					}
				},
				{
					breakpoint: 700,
					settings: {
						slidesToShow: 3
					}
				},
				{
					breakpoint: 533,
					settings: {
						slidesToShow: 2
					}
				}
			]
		});
	});


	$('.tabs-light-news a').tabs();


	$('.video-player-wrap').one('click',function(e){
		e.preventDefault();
		var videoWidth = $('.video-player-wrap').innerWidth();
		var videoHeight = $('.video-player-wrap').innerHeight();
		var video = document.createElement('video');
		video.id = 'js-loaded-video';
		//video.src = 'video_pari.mp4';
		video.src = 'https://hockey.by/audio/video_pari.mp4';
		video.autoplay = 'true';
		video.preload = 'auto'
		video.height = videoHeight;
		video.width = videoWidth;
		$('.video-player-wrap').prepend(video);

		video.addEventListener("error", function() {
			console.log('error play video');
			video.parentNode.removeChild(video);
			document.querySelector('.video-player-wrap').classList.add('no-ad');
		});
		video.addEventListener("ended", function() {
			video.parentNode.removeChild(video);
			document.querySelector('.video-player-wrap').classList.add('no-ad');

			$('.video-player-wrap').click();
		});
	});


	/*$('.slick-top-item').on('mouseenter',function(){
		var $this = $(this),
				$bg = $this.attr('data-background'),
				$blockBg = $('.top-news').css('backgroundImage'),
				$blockTop = $('.top-news'),
				$reg = /\$bg/i;

		if ($bg !== undefined && $blockBg.search($reg) == -1) {
			$blockTop.addClass('bg-change').css('backgroundImage','url('+$bg+')');
			setTimeout(function(){
				$blockTop.removeClass('bg-change');
			},300);
		}
	});*/

	$('.top-news').prepend('<div class="top-news-back"></div>');
	//меняем фон блока с топ новостями
	function hoverBgChange(){
		var $this = $(this),
				$bg = $this.attr('data-background'),
				$urlBg = 'url('+$bg+')',
				$blockBg = $('.top-news-back').css('backgroundImage'),
				$blockTop = $('.top-news-back'),
				$reg = new RegExp($bg, 'i');

		if ($bg !== undefined && $blockBg.search($reg) == -1) {
			var img = new Image();
			img.src = $bg;
			img.onload = function() {
				$blockTop.addClass('bg-changing');
				setTimeout(function(){
					$blockTop.removeClass('bg-changing').css('backgroundImage',$urlBg);
				},250);
			}
		}
	}


	if(matchMedia) {
		var screen480 = window.matchMedia('(max-width:480px)');
		screen480.addListener(changes);
		changes(screen480);
	}
	function changes(screen480) {
		if(screen480.matches) {
			$('.slick-top-news').on('afterChange',function(slick, currentSlide){
				var $bg = $('.slick-top-news .slick-active').attr('data-background'),
				$urlBg = 'url('+$bg+')',
				$blockBg = $('.top-news-back').css('backgroundImage'),
				$blockTop = $('.top-news-back'),
				$reg = new RegExp($bg, 'i');

				if ($bg !== undefined && $blockBg.search($reg) == -1) {
					var img = new Image();
					img.src = $bg;
					img.onload = function() {
						$blockTop.addClass('bg-changing');
						setTimeout(function(){
							$blockTop.removeClass('bg-changing').css('backgroundImage',$urlBg);
						},250);
					}
				}
			});
		} else {
			$('.slick-top-item').on('mouseenter',hoverBgChange);
		}
	}




	$('.tabs-clubs-standings a').tabs();

	$('.slick-club-store').slick({
		slidesToShow: 4,
		appendArrows: '.slick-club-arrows',
		infinite: false,
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 3,
				}
			},
			{
				breakpoint: 700,
				settings: {
					slidesToShow: 2,
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
				}
			}
		]
	});


	var scsStart = $('.slick-clubs-schedule .scs-main-match').closest('.scs-slide').index();
	var scsItemsLength = $('.slick-clubs-schedule .scs-slide').length;
	var scsDefault;
	if (typeof scsStart !== "number") {
		scsStart = 0;
	}
	if (scsStart + 1 >= scsItemsLength) {
		scsDefault = scsItemsLength - scsStart + 1;
	} else {
		scsDefault = scsStart - 1;
	}
	$('.slick-clubs-schedule').slick({
		slidesToShow: 1,
		infinite: false,
		initialSlide: scsDefault,
		variableWidth: true
	});

	$('.radio-toggler a').bind('click',function(){
		$(this).siblings('.radio-slider').toggleClass('active');
	});
	$('.radio-slider').bind('click',function(){
		$(this).siblings('a').not('.selected').click();
	});


	backgrounded('.scn-link');


	var slickClubNews = $('.slick-club-news');
	slickClubNews.slick({
		dots: true,
		arrows: false
	});


	//плавающие новости
	if ( $('.flip-club-news').length) {

		$(window).on('scroll', function(){
			var windowOffset = $(window).scrollTop(),
					floatOffset = $('.flip-club-news-wrap').offset().top,
					contentHeight = $('.flx-main-content').innerHeight(),
					contentOffset = $('.flx-main-content').offset().top,
					floatHeight = $('.flip-club-news').innerHeight(),
					floatStop = contentOffset + contentHeight - floatHeight;

			if (windowOffset > floatOffset && windowOffset < floatStop) {
				$('.flip-club-news').addClass('fixed').removeClass('flipped');
			} else {
				$('.flip-club-news').removeClass('fixed').addClass('flipped');

				if (windowOffset < floatStop) {
	        $('.flip-club-news').removeClass('flipped');
	    	}
			}
		});

		$(window).on('load resize', function(){
			var floatWidth = $('.flip-club-news-wrap').innerWidth();
			$('.flip-club-news').css('maxWidth',floatWidth);
		});
	}//if end



});//ready close

