$(document).ready(function(){
	console.log('ready');

	$('.thumb-list').slick({
		infinite: false,
		slidesToShow: 1,
		slidesToScroll: 1,
	});

	$('.list-imovel.list-relac').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		responsive: [{
	      breakpoint: 1024,
	      settings: {
	        slidesToShow: 1,
	        slidesToScroll: 1,
	        arrows: false,
  			autoplay: true,
  			autoplaySpeed: 2500,
	      }
	    }]
	});

	$('.filter, #close-btn').on('click', function() {
		$('.aside-content').fadeToggle(300);
	});

	$('.aside-content h3').on('click', function() {
		if($(this).next('ul').is(':visible')) {
			$('h3 + ul').slideUp();
		} else {
			$('h3 + ul').slideUp();
			$(this).next('ul').slideDown('open');
		}
	});
});

function toggleFormat(f) {
	if(f == 'col') {
		$('.list-imovel').addClass('format-col').find('.thumb-list').slick('refresh');
	} else {
		$('.list-imovel').removeClass('format-col').find('.thumb-list').slick('refresh');
	}
}

function toggleInfoBox(e) {
	jQuery('.' + e + '-box').slideToggle(300);
}