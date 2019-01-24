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
	});
});

function toggleFormat(f) {
	if(f == 'col') {
		$('.list-imovel').addClass('format-col');
	} else {
		$('.list-imovel').removeClass('format-col');
	}
}