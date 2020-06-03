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


jQuery.validator.setDefaults({
  errorClass: 'invalid',
	successClass: 'valid',
	focusInvalid: false,
	errorElement: 'span',
	errorPlacement: function (error, element) {
    if ( element.parent().hasClass('jq-checkbox') ||  element.parent().hasClass('jq-radio')) {
      element.closest('label').after(error);
      
    } else if (element.parent().hasClass('jq-selectbox')) {
      element.closest('.jq-selectbox').after(error);
    } else {
      error.insertAfter(element);
    }
  },
  highlight: function(element, errorClass, validClass) {
    if ( $(element).parent().hasClass('jq-checkbox') ||  $(element).parent().hasClass('jq-radio') || $(element).parent().hasClass('jq-selectbox')) {
    	$(element).parent().addClass(errorClass).removeClass(validClass);
    } else {
    	$(element).addClass(errorClass).removeClass(validClass);
    }
  },
  unhighlight: function(element, errorClass, validClass) {
  	if ( $(element).parent().hasClass('jq-checkbox') ||  $(element).parent().hasClass('jq-radio') || $(element).parent().hasClass('jq-selectbox')) {
    	$(element).parent().removeClass(errorClass).addClass(validClass);
    } else {
    	$(element).removeClass(errorClass).addClass(validClass);
    }
  }
});
//дефолтные сообщения, предупреждения
jQuery.extend(jQuery.validator.messages, {
  required: "Обязательное поле",
  email: "Некорректный email адрес",
  url: "Некорректный URL",
  number: "Некорректный номер",
  digits: "Это поле поддерживает только числа",
  equalTo: "Поля не совпадают",
  maxlength: jQuery.validator.format('Максимальная длина поля {0} символа(ов)'),
  minlength: jQuery.validator.format('Минимальная длина поля {0} символа(ов)'),
  require_from_group: jQuery.validator.format('Отметьте миниммум {0} из этих полей')
});
//кастомные методы валидатора
jQuery.validator.addMethod("lettersonly", function(value, element) {
  return this.optional(element) || /^[a-zA-ZА-Яа-я]+$/i.test(value);
}, "Только буквы");

jQuery.validator.addMethod("telephone", function(value, element) {
  return this.optional(element) || /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/i.test(value);
}, "Некорректный формат");


jQuery(document).ready(function($){

	if ($('.champ-days-left').length) {
		champTimer();
		$('.champ-txt .h2').text('Дней до начала 2021 ИИХФ');
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
	});*/

	var schStartIndex = $('.slick-schedule .item table .centered').closest('.item').index();
	var schItemsLength = $('.slick-schedule .item').length;
	var schDefaultIndex, schStartIndex_1200, schStartIndex_700;
	if (typeof schStartIndex !== "number") {
		schStartIndex = 0;
	}
	if (schStartIndex + 4 >= schItemsLength) {
		schDefaultIndex = schItemsLength - schStartIndex + 6;
	} else {
		schDefaultIndex = schStartIndex;
	}
	schStartIndex_1200 = (schStartIndex + 2 >= schItemsLength) ? schItemsLength - schStartIndex + 4 : schStartIndex;
	schStartIndex_700 = (schItemsLength - schStartIndex - 2 <= 0) ? schItemsLength - 2 : schStartIndex;
	//console.log(schStartIndex, schDefaultIndex, schStartIndex_1200, schStartIndex_700);
	var slickSchedule = $('.slick-schedule');
	slickSchedule.slick({
		infinite: false,
		arrows: true,
		slidesToShow: 5,
		initialSlide: schDefaultIndex,
		dots: false,
		responsive: [
			{
	      breakpoint: 1200,
	      settings: {
	        slidesToShow: 3,
	        autoplay: true,
	        autoplayTimeout: 4500,
	        arrows: false,
	        initialSlide: schStartIndex_1200
	      }
	    },
	    {
	      breakpoint: 700,
	      settings: {
	        slidesToShow: 2,
	        autoplay: true,
	        autoplayTimeout: 4500,
	        arrows: false,
	        initialSlide: schStartIndex_700
	      }
	    },
	    {
	      breakpoint: 480,
	      settings: {
	        slidesToShow: 1,
	        autoplay: true,
	        autoplayTimeout: 4500,
	        arrows: false,
	        initialSlide: schStartIndex
	      }
	    }
		]
  });
  // slickSchedule.slick('slickGoTo', schStartIndex);



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
		minDate: false,
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
		appendArrows: $('.slick-related-arrows'),
		responsive: [
			{
				breakpoint: 1100,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					dots: true,
					arrows: false
				}
			}
		]
	});

	if ( $('article').length && $('.ya-share2').length ) {
		var firstImage = '';
		var siteHost = location.protocol + '//' +location.hostname;
		if ($('article img').length) {
			firstImage = $('article img:first').attr('src');
			if (firstImage.search(/http/i) === -1) {
				firstImage = siteHost + firstImage;
			}
			$('.ya-share2').attr('data-image',firstImage);
			$('meta[property="og:image"]').attr('content',firstImage);
			$('meta[name="twitter:image"]').attr('content',firstImage);
		}
	}


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
				titleHeight = $this.find('.title').outerHeight(true),
				gutter;
		txt.css({
			'overflow':'initial',
			'maxHeight':'none'
		});
		gutter = txt.innerHeight();
		if (gutter >= 260) {
			gutter = 260;
		} else {
			gutter += 12;
		}
		if (gutter + titleHeight > 85) {//gutter > 44
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

 	//$(".scroll-up").scrollToTop();



	//инициализация табов
	$('.tabs-pr-descrip a').tabs();

	var slickStore = $('.slick-store');
	slickStore.slick({
		slidesToShow: 4,
		slidesToScroll: 4,
		arrows: true,
		dots: false,
		appendArrows: $('.store-arrows'),
		infinite: false,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3
				}
			},
			{
				breakpoint: 610,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
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
			infinite: false,
			responsive: [
				{
					breakpoint: 1080,
					settings: {
						slidesToShow: 4,
						slidesToScroll: 4
					}
				},
				{
					breakpoint: 800,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3
					}
				},{
					breakpoint: 480,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2
					}
				},
				{
					breakpoint: 360,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}
			]
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
		$('.top-players-tabs a').tabs();
	},300);
	$('.tabs-social-photos a').tabs();
	

	$('.tabs-social-photos a').bind('click', function(){
		var $this = $(this), $hash = $this.attr('href');
    setTimeout(function(){
    	if ($($hash).find('.slick-slider').length) {
      	// $($hash).find('.slick-slider').slick('slickGoTo', 0);
      	$($hash).find('.slick-slider').slick('setPosition',0);
      }
    },10);
  });

	function blockBackgrounded (el) {
		var src = $(el).find('.bg').attr('src');
		$(el).css('backgroundImage','url('+src+')');
	}
	blockBackgrounded('.js-bg');

	$.fn.scrollToBottom = function() {
    $(this).hide().removeAttr("href");
    if ($(window).scrollTop() <= $('#footer').offset().top - $('#footer').innerHeight()) $(this).fadeIn("slow")
    var scrollDiv = $(this);
    $(window).scroll(function() {
     if ($(window).scrollTop() >= $('#footer').offset().top - $('#footer').innerHeight()) $(scrollDiv).fadeOut("slow")
     else $(scrollDiv).fadeIn("slow")
    });
    $(this).click(function() {
     $("html, body").animate({scrollTop: $('#footer').offset().top + $('#footer').innerHeight()}, 0);
    })
  }

	$(".arrow-to-top").scrollToTop();
	$('.arrow-to-bottom').scrollToBottom();

	if ($('.online-header').length) {
		$('#container').addClass('relative brandings');
		$('#container').prepend('<a href="https://adnetrotate.com/click/general?bid=38455_28515_4009_false&siteid=" class="branding-block-link" rel="nofollow" target="_blank"><img data-src="//hockey.by/local/templates/hokey/images/br-top.jpg"></a>');

		$(window).on('scroll', function(){
			var windowOffset = $(window).scrollTop(),
					floatOffset = $('#container').offset().top - 40;

			if (windowOffset > floatOffset) {
				$('#container').addClass('fixed-bg');
			} else {
				$('#container').removeClass('fixed-bg');
			}
		});

		$(window).on('resize load',function(){
			if(window.innerWidth < 992 && (!$('.branding-block-link img').hasClass('loaded'))) {
				var $src = $('.branding-block-link img').data('src');
				console.log($src);
				$('.branding-block-link img').attr('src',$src).addClass('loaded');
			}
		});

		/*$('#container').append('<div class="brandings-link left"><a href="https://adnetrotate.com/click/general?bid=38455_28515_4009_false&siteid=" rel="nofollow" target="_blank"></a></div><div class="brandings-link right"><a href="https://adnetrotate.com/click/general?bid=38455_28515_4009_false&siteid=" rel="nofollow" target="_blank"></a></div>');*/

		/*$(window).on('scroll', function(){
			var windowOffset = $(window).scrollTop(),
					floatOffset = $('#container').offset().top - 40,
					contentHeight = $('#container').height(),
					floatHeight = $('.brandings-link.left a').height(),
					floatStop = floatOffset + contentHeight - floatHeight;

			if (windowOffset > floatOffset && windowOffset < floatStop) {
				$('.brandings-link a').addClass('float').removeClass('flip-bottom');
			} else {
				$('.brandings-link a').removeClass('float').addClass('flip-bottom');

				if (windowOffset < floatStop) {
	        $('.brandings-link a').removeClass('flip-bottom');
	    	}
			}
		});*/

	}//if end


	/*from 20.02.19*/
	$('.tabs-playoffs-menu a').tabs();


	$(document).on('click','.tabs-stage-menu a',function(e){
		e.preventDefault();
		if ($(this).hasClass('active')) return;
		if($('.to-tab-tables').hasClass('active')) {
			$('.block-tables').fadeOut(100);
			$('.block-playoff').fadeIn(100);
			$('.tabs-stage-menu .tab-slider').addClass('active');
		} else {
			$('.block-tables').fadeIn(100);
			$('.block-playoff').fadeOut(100);
			$('.tabs-stage-menu .tab-slider').removeClass('active');
		}
		$('.tabs-stage-menu a').toggleClass('active');
	});

	$(document).on('click','.tabs-stage-menu .tab-slider',function(){
		if($('.to-tab-tables').hasClass('active')) {
			$('.block-tables').fadeOut(100);
			$('.block-playoff').fadeIn(100);
			$(this).addClass('active');
			activatePlayoffTab();
		} else {
			$('.block-tables').fadeIn(100);
			$('.block-playoff').fadeOut(100);
			$(this).removeClass('active');
		}
		$('.tabs-stage-menu a').toggleClass('active');
	});

	function activatePlayoffTab(){
		setTimeout(function(){
			$('.ddsStandingsBlock:visible').find('.tabs-playoffs-menu a:first').click();
			// console.log('active playoffs');
		},150);
	}

	$('.to-tab-playoffs').bind('click',activatePlayoffTab);
	$('select[name="changeStandingsBlock"]').on('change',function(){
		var activeBlock = '.StandingsBlock-'+this.value;
		console.log('change '+ this.value);
		// activatePlayoffTab();
		// $('.to-tab-tables').click();
		if (!$(activeBlock).find('.po-couple').length) {
			$('.to-tab-tables').click();
			// console.log('tables click');
		} else {
			$('.to-tab-playoffs').click();
			// console.log('playoffs click');
		}
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

	var hscStart = $('.slick-new-schedule .hsc-item .hsc-match-time').closest('.hsc-item').index();
	//var hscStart = 6;
	var hscItemsLength = $('.slick-new-schedule .hsc-item').length;
	var hscDefault;
	if (typeof hscStart !== "number" || hscStart < 0) {
		hscStart = 0;
	}
	/*if (hscStart + 4 >= hscItemsLength) {
		hscDefault = hscItemsLength - hscStart + 6;
	} else {
		hscDefault = hscStart;
	}*/
	/*if (hscStart + 4 >= hscItemsLength) {
		hscDefault = hscItemsLength - 5;
	} else {
		hscDefault = hscStart;
	}*/
	console.log(hscStart, hscItemsLength);

	// (hscStart + 4 >= hscItemsLength) ? hscItemsLength - 5 : hscStart;

	var slickHSC = $('.slick-new-schedule');
	slickHSC.slick({
		slidesToShow: 6,
		infinite: false,
		initialSlide: (hscStart + 4 >= hscItemsLength) ? hscItemsLength - 5 : hscStart,
		responsive: [
			{
				breakpoint: 1180,
				settings: {
					slidesToShow: 5,
					initialSlide: (hscStart + 3 >= hscItemsLength) ? hscItemsLength - 4 : hscStart
				}
			}, {
				breakpoint: 992,
				settings: {
					slidesToShow: 4,
					initialSlide: (hscStart + 2 >= hscItemsLength) ? hscItemsLength - 3 : hscStart
				}
			}, {
				breakpoint: 768,
				settings: {
					slidesToShow: 3,
					initialSlide: (hscStart + 1 >= hscItemsLength) ? hscItemsLength - 2 : hscStart
				}
			}, {
				breakpoint: 567,
				settings: {
					slidesToShow: 2,
					initialSlide: hscStart
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
		});
	});


	if ($('.top-news-bg').length) {
		document.querySelector('img.top-news-bg').onload = function(){
			let src = this.src;
			let block = document.querySelector('.top-news-back');
			block.style.backgroundImage = 'url('+src+')';
			$('.top-news').addClass('js-bg-added');
		}
	}
	

	//меняем фон блока с топ новостями
	function hoverBgChange(){
		var $this = $(this),
				$bg = $this.attr('data-background'),
				$urlBg = 'url('+$bg+')',
				$blockBg = $('.top-news-back').css('backgroundImage'),
				$blockTop = $('.top-news-back'),
				$reg = new RegExp($bg, 'i');

		if ($bg !== undefined && $blockBg && $blockBg.search($reg) == -1) {
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
		screen480.addListener(changes480);
		changes480(screen480);
	}
	function changes480(screen480) {
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
			$('.club-videos > .flex-row').slick({
				arrows: false,
				dots: true
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


	/*var scsStart = $('.slick-clubs-schedule .scs-main-match').closest('.scs-slide').index();
	var scsItemsLength = $('.slick-clubs-schedule .scs-slide').length;
	var scsDefault;
	if (typeof scsStart !== "number") {
		scsStart = 0;
	}
	if (scsStart + 1 >= scsItemsLength) {
		scsDefault = scsItemsLength - scsStart + 1;
	} else {
		scsDefault = scsStart - 1;
	}*/
	/*var scsStart = $('.slick-clubs-schedule .scs-main-match').closest('.scs-slide').index();
	var scsItemsLength = $('.slick-clubs-schedule .scs-slide').length;
	var scsDefault;
	if (typeof scsStart !== "number") {
		scsStart = 0;
	}
	if (scsStart + 1 >= scsItemsLength) {
		scsDefault = scsItemsLength - scsStart + 1;
	} else {
		scsDefault = scsStart - 1;
	}*/
	var scsStart = 2;
	if($('.scs-main-match').length && $('.scs-match-completed').length == 2) {
		scsStart = 1;
	}
	$('.slick-clubs-schedule').slick({
		slidesToShow: 1,
		infinite: false,
		initialSlide: scsStart,
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

