document.addEventListener('DOMContentLoaded',function(){
  $(document).on('click','.po-series-games-toggler',function(e){
		e.preventDefault();
		var $parent = $(this).closest('.po-series');
		$('.po-series').not($parent).removeClass('opened');
		$parent.toggleClass('opened');
		setTimeout(function(){
			var $listHeight = $parent.find('.po-series-games').innerHeight();
			$('.playoff-block-inner').css('paddingBottom',($listHeight-53)+'px');
		},10);
		
	})

	$(document).on('mouseup',function(e){
		if ($('.po-series').has(e.target).length === 0){
			$('.po-series').removeClass('opened');
			$('.playoff-block-inner').css('paddingBottom',0);
    }
	});
});
