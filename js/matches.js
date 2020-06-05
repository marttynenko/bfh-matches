//lazy load для сторонних либ
function lazyLibraryLoad(scriptSrc,linkHref,callback) {
  let script = document.createElement('script');
  script.src = scriptSrc;
  if (!document.querySelector('script[src="'+scriptSrc+'"]')) {
    document.querySelector('script[src*="script.js"]').before(script);

    script.onload = callback
  }

  if (linkHref !== '') {
    let style = document.createElement('link');
    style.href = linkHref;
    style.rel = 'stylesheet';
    if (!document.querySelector('link[src="'+linkHref+'"]')) {
      document.querySelector('link[href*="style.css"]').before(style);
    }
  }
}


document.addEventListener('DOMContentLoaded',function(){
  $('.game-tabs a').tabs();
  $('.facetoface-tabs a').tabs();

  $(document).on('click','.game-anonce-link',function(e){
    e.preventDefault();
    const that = $(this);
    const toggled = that.closest('.game-anonce').find('.game-anonce-hidden');
    let text = $(this).text();
    if (text == 'Подробнее') {
      toggled.slideDown(200);
      that.text('Скрыть анонс');
    } else {
      toggled.slideUp(200);
      that.text('Подробнее');
    }
  })

  const Preloader = {
    //разметка прелоадера
    preloader: '<div class="ui-preloader"><div class="lds-ellipsis ui-preloader-spinner"><div></div><div></div><div></div><div></div></div><div class="ui-preloader-hint">Подождите, идет загрузка</div></div>'
  }


  $(document).on('click','.ajax-content-load',function(e){
    e.preventDefault();
    
    const $this = $(this)
    const $tab = $($this.attr('href'))
    const $url = $this.attr('data-href') || -1
    const $isLoaded = $this.attr('data-loaded') || -1
    const $slick = $tab.find('.slick-slider')
    
    //подгружаем табы аяксом    
    if($url !== -1 && $isLoaded == 'false') {
      $tab.html(Preloader.preloader);
      $.ajax({
        method:'GET',
        url: $url,
        success: function(data) {
          $this.attr('data-loaded','true');
          $tab.html(data);
        },
        error: function() {
          $this.attr('data-loaded','true');
          $tab.html('<div class="ui-error">Произошла непредвиденная ошибка. Обратитесь в поддержку сайта.</div>')
        }
      })
    }
    //реинитим карусели
    if ($slick.length) {
      setTimeout(function(){
        $slick.slick("slickSetOption", '', false, true);
      },100);
    }
    if ($tab.length && $tab.offset().top - $this.offset().top > document.documentElement.clientHeight / 2) {
      $('html,body').animate({
        scrollTop:$tab.offset().top - 30
      },300)
    }
  })

  $('.slick-game-events').slick({
    slidesToShow: 3,
    infinite: false
  })

});


function fotoramaOverviewInit(){
  $('.fotorama-overview').fotorama({
    width: '100%',
    maxwidth: 860,
    ratio: '3/2',
    allowfullscreen: false,
    nav: 'thumbs',
    thumbwidth: 122,
    thumbheight: 78,
    thumbmargin: 10,
    thumbborderwidth: 2,
    thumbfit: 'cover'
  })

  $('.fotorama-video').fotorama({
    width: '100%',
    maxwidth: 860,
    ratio: '16/9',
    fit: 'cover',
    allowfullscreen: false,
    nav: 'thumbs',
    thumbwidth: 280,
    thumbheight: 160,
    thumbmargin: 10,
    thumbborderwidth: 2,
    thumbfit: 'cover'
  })
}