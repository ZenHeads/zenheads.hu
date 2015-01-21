/**************************************************
********       header image animation      ********
**************************************************/

function headerAnimation() {
	var animationScrollY = 400;/* connect with the body padding-top value in index.css */
	
	var wrapper = $("#content-wrapper");
	var blurred = $(".blurred");
	var greyLayer = $(".grey-layer");
	var distanceY = $(window).scrollTop();

	var opacity;
	
	// fix min-height for body - display scrollbar
	var bodyMinHeight = ($("body").height() > 400*400/150) ? $("body").height() : 400*400/150;
	$("body").css("min-height",bodyMinHeight+"px");
	
	if(distanceY < animationScrollY) {
		// disable scrolling
		if(!wrapper.hasClass("fixed")){
			wrapper.addClass("fixed");
		}
		
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
		// enable scrolling
		if(wrapper.hasClass("fixed")){
			wrapper.removeClass("fixed");
		}
	}
	
	// floating text to top
	$("#wrapper-header > .content > .inner-content").css("top",-1.25*distanceY);
	// fade content
	dynamicFade($("#logo"), distanceY);
	dynamicFade($("#site-heading"), distanceY);
	dynamicFade($("#site-text"), distanceY);
}

// function for dynamic text fading in the header on scrolling
function dynamicFade(elem, scroll) {
	var c = 60;/* same as the top-header's height value */
	var opacity = 1;
	// top offset
	var topOffset = elem.offset().top;
	// height
	var height = elem.height();
	
	if(scroll > topOffset-c){
		// start to fadeOut
		opacity = 1-1.5*(scroll+c-topOffset)/height;
		opacity = opacity < 0 ? 0 : opacity;
	}
	if(scroll < c) opacity = 1;
	if(scroll > topOffset+height-c) opacity = 0;
	
	elem.css("opacity", opacity);
}