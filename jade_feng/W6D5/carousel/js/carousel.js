$previous = $('#previous');
$next = $('#next');
$carousel = $('#carousel');


$carousel.css('left', 0);
var count = 0;

var moveLeft = function() {
	count += -1;
	if (count < 0) {
		count = 2;
		$carousel.css("width", "+=1836");
		$carousel.prepend($carousel.find('img').clone());
		// $carousel.animate({left: "+=612"});		
		$carousel.css({left: "-=1836"});
		$carousel.animate({left: "+=612"});
	} else {
		$carousel.animate({left: "+=612"});
	}
};

var moveRight = function() {
	count += +1;
	if (count > 2 ) {
		count = 0;
		$carousel.css("width", "+=1836");			
		$carousel.append($carousel.find('img').clone());	
		$carousel.animate({left: "-=612"});
		// $carousel.animate({left: "-=1224"});
	} else {
		$carousel.animate({left: "-=612"});
	}
};

$previous.on('click', moveLeft );

$next.on('click', moveRight );