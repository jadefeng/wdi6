var addColor = function() {
	var color = $('#color').val();
	var $box = $('<div/>');
	$box.addClass('box');
	$box.css('background-color', color);
	$box.on('click', setColor);
	$('#colors').prepend($box);
};

var setColor = function () {
	var color = $(this).css('background-color');
	// console.log(color);
	$('#current_color').css('background-color', color);
};

var paintPixel = function() {
	var color = $('#current_color').css('background-color');
	$(this).css('background-color', color);
};

$(document).ready(function (){
	$('#add_color').on('click', addColor);
	$('#colors').on('click', ".box", setColor);
	$('#canvas').on('mouseover', '.pixel', paintPixel);
	// console.log('box count:', $('.box').length);

	// for (var i = 0; i < 10000; i++) {
	// 	$('#canvas').append('<div class="pixel"/>');
	// }

	var pixels = '';
	for (var i = 0; i < 50000; i++) {
		pixels += '<div class="pixel" />';
	}
	$('#canvas').append(pixels);

});
