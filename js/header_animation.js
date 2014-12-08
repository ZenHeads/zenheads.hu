/**************************************************
********       header image animation      ********
**************************************************/

function headerAnimation() {
	var animationScrollY = 400;
	
	var body = $("body");
	var blurred = $(".blurred");
	var greyLayer = $(".grey-layer");
	var distanceY = $(window).scrollTop();
	
	var opacity;
	
	if(distanceY < animationScrollY) {
		// fake scroll effect
		body.css("padding-top", distanceY+60+"px");
		
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
				blurred.css("opacity",opacity);
			}
		}
	} else {
		greyLayer.css("opacity",0);
		blurred.css("opacity",0);
	}
	
	// floating text to top
	$("#wrapper-header > .content > .inner-content").css("top",-1.25*distanceY);
	// fade content
	dynamixFade($("#logo"), distanceY);
	dynamixFade($("#site-heading"), distanceY);
	dynamixFade($("#site-text"), distanceY);
}

function dynamixFade(elem, scroll) {
	var c = 60;
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