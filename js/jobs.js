$(document).ready(function(){
	// menu is not fixed below 650px width
	$( window ).resize(function() {
		var topHeader = $("#top-header");
		if($(window).width()<=650){
			if(topHeader.hasClass("fixed")){
				topHeader.removeClass("fixed");
			}
			if(!topHeader.hasClass("absolute")){
				topHeader.addClass("absolute");
			}
		}
		else {
			if(!topHeader.hasClass("fixed")){
				topHeader.addClass("fixed");
			}
			if(topHeader.hasClass("absolute")){
				topHeader.removeClass("absolute");
			}
		}
	});

	/*var submenu = $("#submenu");
	var submenuHolder = $("#submenu-holder");
	var submenuOffsetTop = submenu.offset().top-60;
	// submenu is pinned if at top
	$( window ).scroll(function(){
		var windowScrollTop = $(window).scrollTop();
		if(windowScrollTop>=submenuOffsetTop){
			if(!submenu.hasClass("pinned")){
				submenu.addClass("pinned");
				submenuHolder.addClass("pinned");
			}
		}
		else {
			if(submenu.hasClass("pinned")){
				submenu.removeClass("pinned");
				submenuHolder.removeClass("pinned")
			}
		}
	});*/
	// menu
	$("#navbar-mobile-btn").click(function(){
		$("#navbar").toggleClass("toggle");
	});
	$(document).mouseup(function (e)
	{
	    var container = $("#navbar");
	    var btn = $("#navbar-mobile-btn");

	    if (!container.is(e.target) // if the target of the click isn't the container...
	        && container.has(e.target).length === 0) // ... nor a descendant of the container
	    {
	    	if(container.hasClass("toggle")){ container.removeClass("toggle");}
	    }
	});
	
	// submenu
	$("#submenu-mobile-btn").click(function(){
		$("#submenu").toggleClass("toggle");
	});
	$(document).mouseup(function (e)
	{
	    var container = $("#submenu");

	    if (!container.is(e.target) // if the target of the click isn't the container...
	        && container.has(e.target).length === 0) // ... nor a descendant of the container
	    {
	    	if(container.hasClass("toggle")){ container.removeClass("toggle");}
	    }
	});
	
	$(".submenu-btn").click(function(e){
		$('html, body').animate({
			scrollTop: $( $.attr(this, 'href') ).offset().top-80
		}, 200);
		return false;
	});
});