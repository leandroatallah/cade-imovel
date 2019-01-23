$(document).ready(function(){
	console.log('ready');
});

function toggleFormat(f) {
	if(f == 'col') {
		$('.list-imovel').addClass('format-col');
	} else {
		$('.list-imovel').removeClass('format-col');
	}
}