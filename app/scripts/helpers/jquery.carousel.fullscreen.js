(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery', 'bootstrap'], factory);
  } else {
    // RequireJS isn't being used. Assume backbone is loaded in <script> tags
    factory(jQuery);
  }
}(function (jQuery) {

	/******************************************************************************
		Transforms the basic Twitter Bootstrap Carousel into Fullscreen Mode
		@author Fabio Mangolini
	     http://www.responsivewebmobile.com
	******************************************************************************/
	$.carouselFullscreen = function() {
		$('.carousel').carousel({
	    	pause: "false",
	    	interval: 4000
		});

		$('.carousel').css({'margin': 0, 'width': $(window).outerWidth(), 'height': $(window).outerHeight()});
		$('.carousel .item').css({'position': 'fixed', 'width': '100%', 'height': '100%'});
		$('.carousel-inner div.item img').each(function() {
			var imgSrc = $(this).attr('src');
			$(this).parent().css({'background': 'url('+imgSrc+') center center no-repeat', '-webkit-background-size': '100% ', '-moz-background-size': '100%', '-o-background-size': '100%', 'background-size': '100%', '-webkit-background-size': 'cover', '-moz-background-size': 'cover', '-o-background-size': 'cover', 'background-size': 'cover'});
			$(this).remove();
		});

		$(window).on('resize', function() {
			$('.carousel').css({'width': $(window).outerWidth(), 'height': $(window).outerHeight()});
		});
	}

 	return jQuery;
  
}));