var s;
window.onload = function() {
	s = skrollr.init({
		smoothScrolling: false,
		forceHeight: true
	});
	fixDocumentHeightForMobile();
	
	// if product is given in url
	if(window.location.href.indexOf('#')!=-1){
		var anchor = window.location.href.slice(window.location.href.indexOf('#') + 1)+'-product';
		var products = [];
		$("#featured-products > #display-product > .product").map(function(){
			products.push($(this).attr("id")); // get all product's id
		});
		// check is given product is exists
		if($.inArray(anchor,products)>-1){
			// product is exists
			displayProduct($("#"+anchor));
		}
	}
};
// height fix
function fixDocumentHeightForMobile(){
	$("#skrollr-body").height($("#wrapper").outerHeight());
	s.refresh(document.body);
}
// create navigation buttons on products
function makeBulletsNavigationOnProductImage(product){
	var imgHolder = product.find(".img-holder");
	var bulletsNavbar = imgHolder.find(".bullets-navbar");
	var images = imgHolder.find("img");
	var activeIndex = 0;
	images.map(function(){
		if($(this).is(":visible")){
			activeIndex = images.index($(this));
		}
	});
	// if more than 1 image
	var num = images.length;
	var bulletsHtml ="";
	if(num>1){
		for(var i=0; i< num; i++){
			bulletsHtml += '<span class="bullets-item btn white-bg'+(i==activeIndex?' active':'')+'"></span>';
		}
		bulletsNavbar.html(bulletsHtml);
		// make area buttons only once
		if(! imgHolder.has(".area-btn").length){
			imgHolder.append('<div class="left-area area-btn"></div><div class="right-area area-btn"></div>');
		}
	}
}
// display product
function displayProduct(product){
	var products = $("#display-product .product");
	if(!$("#display-product").hasClass("show")){
		$("#display-product").addClass("show");
	}
	products.not(product).hide();
	product.fadeIn(1000);
	fixDocumentHeightForMobile(); // fix document height on mobile after display product
	
	//scroll
	var mtWrapper = $("html").hasClass("skrollr-desktop") ? 400 : 0;
	s.animateTo(mtWrapper+685, {duration: 200});
}
// hover-over title on product list items
function showTitle(d) {
	$(d).addClass("hovered");
	$(d).append('<span class="hover-over-title">' + $(d).attr('data-title') + '</span>');
}
function hideTitle(d) {
	$(d).removeClass("hovered");
	$(d).children(".hover-over-title").remove();
}
// show tooltip
function showTooltip(d) {
	var type = d.attr("data-type");
	var text = {"design" : "UI/UX&nbsp;Design", "mobile" : "Mobile App Development", "server" : "Backend Development"};
	
	d.append('<div class="hover-over-tooltip"><div class="hover-over-inner">' + text[type] + '</div></div>');
	var tooltip = d.children(".hover-over-tooltip");
	var w = tooltip.innerWidth();
	tooltip.css("left",-(w/2-26)+"px");
}
function hideTooltip() {
	$(".hover-over-tooltip").remove();
}

$(document).ready( function() {
	
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
	// menu
	$("#navbar-mobile-btn").click(function(){
		$("#navbar").toggleClass("toggle");
	});
	$(document).mouseup(function (e)
	{
	    var container = $("#navbar");

	    if (!container.is(e.target) // if the target of the click isn't the container...
	        && container.has(e.target).length === 0) // ... nor a descendant of the container
	    {
	    	if(container.hasClass("toggle")){ container.removeClass("toggle");}
	    }
	});

	// preload product images, then hide before display product
	$("#display-product .product").map( function(){
		var imageHolder = $(this).find(".img-holder");
		var images = imageHolder.find("img");
		images.not($(images.get(0))).hide();
		
		// make navigation buttons on products
		makeBulletsNavigationOnProductImage($(this));
	});
	
	// display product
	$("#product-list .product img").on("click", function() {
		var product = $($(this).data("product")+"-product");
		displayProduct(product);
	});
	
	// bullets navigation
	$(".bullets-item").off().on("click", function(){
		var navbar = $(this).parent(".bullets-navbar");
		var bullets = navbar.find(".bullets-item");
		var index = bullets.index($(this));
		var imgHolder = navbar.parent(".img-holder");
		var images = imgHolder.find("img");
		images.hide();
		var img = $(images.get(index));
		img.show();
		bullets.removeClass("active");
		$(this).addClass("active");
	});
	// area navigation
	$(".left-area").off().on("click", function(){
		var navbar = $(this).parent(".img-holder").find(".bullets-navbar");
		var bullets = navbar.find(".bullets-item");
		var num = bullets.length;
		var activeBullet = navbar.find(".active");
		var index = bullets.index(activeBullet);
		if(num > 0 && index >= 0){
			var imgHolder = navbar.parent(".img-holder");
			var images = imgHolder.find("img");
			images.hide();
			if(index==0) index = num;
			var img = $(images.get(index-1));
			var bullet = $(bullets.get(index-1));
			img.show();
			bullets.removeClass("active");
			bullet.addClass("active");
		} else {
			return false;
		}
	});
	$(".right-area").off().on("click", function(){
		var navbar = $(this).parent(".img-holder").find(".bullets-navbar");
		var bullets = navbar.find(".bullets-item");
		var num = bullets.length;
		var activeBullet = navbar.find(".active");
		var index = bullets.index(activeBullet);
		if(num > 0 && index < num){
			var imgHolder = navbar.parent(".img-holder");
			var images = imgHolder.find("img");
			images.hide();
			if(index==(num-1)) index = -1;
			var img = $(images.get(index+1));
			var bullet = $(bullets.get(index+1));
			img.show();
			bullets.removeClass("active");
			bullet.addClass("active");
		} else {
			return false;
		}
	});
	
	// hide product
	$(".product-close-btn").off().on("click", function() {
		$("#display-product").removeClass("show");
		$("#display-product .product").hide();
		fixDocumentHeightForMobile();
	});
	
	// paging left
	$(".product-prev-btn").not(".disabled").off().on("click",function(){
		var product = $(this).parents(".product");
		var products = $("#display-product .product");
		var num = products.length;
		var index = products.index(product);
		if(index==0) index=num;
		var nextProduct = products.get(index-1);
		if(nextProduct != 'undefined'){
			product.hide();
			$(nextProduct).fadeIn(1000);
		}
	});
	
	// paging right
	$(".product-next-btn").not(".disabled").off().on("click",function(){
		var product = $(this).parents(".product");
		var products = $("#display-product .product");
		var num = products.length;
		var index = products.index(product);
		if(index==(num-1)) index=-1;
		var nextProduct = products.get(index+1);
		if(nextProduct != 'undefined'){
			product.hide();
			$(nextProduct).fadeIn(1000);
		}
	});
	
	// tooltip hover-over effect on touchscreen devices and desktop
	$('.tooltip').bind('touchstart mouseenter', function(e) {
        e.preventDefault();
        showTooltip($(this));
    });
    $('.tooltip').bind('touchend mouseleave', function(e) {
        e.preventDefault();
        hideTooltip();
    });
    
	// hover-over title on product list items
	$(".hover-title").mouseenter(function(){
		showTitle($(this));
	});
	$(".hover-title").mouseleave(function(){
		hideTitle($(this));
	});
});