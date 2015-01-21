/**************************************************
********       header image animation      ********
**************************************************/
var HeaderAnimation = function() {
	
	var 
	animationScrollY = 400,
	delayY = 100,
	time = 300,
	distance = 50,
	wrapper = $("#content-wrapper"),
	blurred = $(".blurred"),
	greyLayer = $(".grey-layer"),
	pageTopOffset = 60,/* same as the top-header's height value */
	amplitude = 1.7, /* value beetween 1 and 2 */
	textObjects = [
		$("#logo"),
		$("#site-heading"),
		$("#site-text")
	];
	
	// animateImage
	var animateImage = function(distanceY){
		var opacity;
		
		// scrolling enable-disable
		if(distanceY < (animationScrollY+delayY)) {
			// disable scrolling
			if(!wrapper.hasClass("fixed")){
				wrapper.addClass("fixed");
			}
		}else{
			// enable scrolling
			if(wrapper.hasClass("fixed")){
				wrapper.removeClass("fixed");
			}
		}
		
		// animation
		if(distanceY < animationScrollY) {
			if(distanceY == 0){
				greyLayer.css("opacity",1);
				blurred.css("opacity",1);
			}
			if(distanceY > 0){
				// fade content
				if(distanceY < (animationScrollY/2)) {
					opacity = 1-(2 * (distanceY / animationScrollY));
					greyLayer.css("opacity",opacity);
				}
				// fade blurred image
				if(distanceY > (animationScrollY/2)) {
					opacity = 1-(2 * ((distanceY-animationScrollY/2) / animationScrollY));
					greyLayer.css("opacity",0);
					blurred.css("opacity",opacity);
				}
			}
		} else {
			greyLayer.css("opacity",0);
			blurred.css("opacity",0);
		}
	};
	
	// animateText
	var animateText = function(elem, scroll){
		
		var opacity = 1;
		// top offset
		var topOffset = elem.offset().top;
		// height
		var height = elem.height();
		
		if(scroll > topOffset-pageTopOffset){
			// start to fadeOut
			opacity = 1-amplitude*(scroll+pageTopOffset-topOffset)/height;
			opacity = opacity < 0 ? 0 : opacity;
		}
		if(scroll < pageTopOffset) opacity = 1;
		if(scroll > topOffset+height-pageTopOffset) opacity = 0;
		
		elem.css("opacity", opacity);
	};
	
	// update animation
	this.update = function(){
		var distanceY = $(window).scrollTop();
		animateImage(distanceY);
		
		// floating text to top
		$("#wrapper-header > .content > .inner-content").css("top",-amplitude*distanceY+"px");
		for(var i in textObjects){
			animateText(textObjects[i],distanceY);
		}
	};
	
	// init animation
	this.init = function(){
		// fix min-height for body - display scrollbar
		var bodyMinHeight = ($("body").height() > animationScrollY*2) ? $("body").height() : animationScrollY*2;
		$("body").css("min-height",bodyMinHeight+"px");
		
		// smooth scrolling
		if (window.addEventListener) window.addEventListener('DOMMouseScroll', wheel, false);
		window.onmousewheel = document.onmousewheel = wheel;

		this.update();
	};
	
	function wheel(event) {
		var delta = 0;
	    if (event.wheelDelta) delta = event.wheelDelta / 120;
	    else if (event.detail) delta = -event.detail / 3;

	    handle(delta);
	    if (event.preventDefault) event.preventDefault();
	    event.returnValue = false;
	}

	// animated scroll
	function handle(delta) {
	    $('html, body').stop().animate({
	        scrollTop: $(window).scrollTop() - (distance * delta)
	    }, time );
	}
};

