const Preloader = {
  //разметка прелоадера
  preloader: '<div class="ui-preloader"><div class="lds-ellipsis ui-preloader-spinner"><div></div><div></div><div></div><div></div></div><div class="ui-preloader-hint">Подождите, идет загрузка</div></div>',
  preloaderOver: '<div class="ui-preloader ui-preloader-over"><div class="lds-ellipsis ui-preloader-spinner"><div></div><div></div><div></div><div></div></div><div class="ui-preloader-hint">Подождите, идет загрузка</div></div>'
}

//Вариант 1. Прелоадер вставляем перед контентом
let $block = $('.block') //селектор блока в который идет подгрузка/который будем отображать по клику
$block.prepend(Preloader.preloader);
$.ajax({
  //...
  success: function(data) {
    $('.ui-preloader').remove();
    //...
  }
  //...
})

//Вариант 2. Прелоадер перекрывает контент таба
let $block = $('.block') //селектор блока в который идет подгрузка/который будем отображать по клику
$block.prepend(Preloader.preloaderOver);
$block.addClass('ui-relative'); //класс ui-relative необходим для корректного позиционирования прелоадера
$.ajax({
  //...
  success: function(data) {
    $('.ui-preloader').remove();
    $block.removeClass('ui-relative');
    //...
  }
  //...
})