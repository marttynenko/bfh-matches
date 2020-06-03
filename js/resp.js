jQuery(document).ready(function($){

	$('.h-mid .flex.align-justify').prepend('<div class="mm-toggler"><i class="mm-1"></i><i class="mm-2"></i><i class="mm-3"></i><span class="mm-txt"></span></div>');

	var teamsCopy = $('.h-teams .team-logo').clone().removeAttr('id');
	var menuCopy = $('.h-menu').clone();
	var socialCopy = $('.h-top-socials').clone().addClass('mobile-socials');
	menuCopy.find('li').removeAttr('id');


	$('body').append('<!--noindex--><div id="mobile-menu"><div class="mobile-links"></div><div class="mobile-teams"></div></div><div id="mm-overlay" onclick=""></div><!--/noindex-->');
	$('.mobile-links').prepend(menuCopy);
	$('.mobile-teams').prepend(teamsCopy);
	$('#mobile-menu').append(socialCopy);
	$('#mobile-menu a').attr('rel','nofollow');
	$('#mobile-menu .h-menu-left').removeClass('h-menu h-menu-left').addClass('m-menu-1');
	$('#mobile-menu .h-menu-right').removeClass('h-menu h-menu-right').addClass('m-menu-2');

	$(document).on('click','.mm-toggler',function(){
		$(this).toggleClass('opened');
		$('#mobile-menu').stop().toggleClass('opened');
		$('#mm-overlay').stop().toggleClass('opened');
	});

	$(document).on('click','#mm-overlay',function(){
		$(this).stop().removeClass('opened');
		$('#mobile-menu').stop().removeClass('opened');
		$('.mm-toggler').stop().toggleClass('opened');
	});

	$('.mobile-links > ul > li').each(function(key,item){
		if ($(item).find('ul').length) {
			$(item).addClass('childs-in');
			$(item).find('a:first').append('<i class="childs-toggler"></i>');
		}
	});
	$(document).on('click','.childs-toggler',function(e){
		e.preventDefault();
		$(this).toggleClass('opened');
		$(this).parent().siblings('ul').slideToggle(100);
	});


	$('main.content table').each(function(key,item){
		if (!$(item).parent().hasClass('responsive-table')) {
			$(item).wrap('<div class="responsive-table"></div>');
		}
	});


	if($('.logo .logo-txt').length) {
		$('.h-mid-logo .logo').addClass('logo-club');
	}


	//перемещаем сайдбар
	if(matchMedia) {
		var screen992 = window.matchMedia('(max-width:992px)');
		screen992.addListener(changes);
		changes(screen992);
	}
	function changes(screen992) {
		if(screen992.matches) {
			// console.log('<992');
			if(!$('.mobile-aftertop-news').length) {
				var newsCompact = $('.flx-main-sidebar .news-compact').clone();
				$('.main-layout > .inner').prepend('<div class="mobile-aftertop-news"><div class="flex-row"></div></div>');
				$('.mobile-aftertop-news > .flex-row').prepend(newsCompact);
				$('.mobile-aftertop-news .news-compact').wrap('<div class="flx-6 flx-u-12"></div>');
			}
			

		} else {
			// console.log('>992');
	
		}
	}

});//ready close

