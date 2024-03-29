if( $( window ).width() >= 1200)
{
	$('body').append('<script type=\"text\/javascript\" src=\"js\/skrollr.min.js\"><\/script>');
	$('body').append('<script type=\"text\/javascript\" src=\"js\/ribbon_desktop.js\"><\/script>');
	var s;
	var animatedElements = $("#r-inner-container, #r-inner-container .r-page, #r-inner-container .r-label");
	window.onload = function() {
		s = skrollr.init({
			smoothScrolling: false,
			forceHeight: true
		});
		
		fixDocumentHeight();
	};
	
	// height fix
	function fixDocumentHeight(){
		$("#skrollr-body").height($("#wrapper").outerHeight());
		s.refresh(document.body);
	}
	
	$("#work").addClass("desktop");
	$("#r-container").addClass("desktop");
	
	var ribbon = new Ribbon("r-container", 490, 110);
}
else {
	$('body').append('<script type=\"text\/javascript\" src=\"js\/ribbon_small.js\"><\/script>');
	
	$("#work").addClass("small");
	$("#r-container").addClass("small");
	
	var ribbon = new Ribbon("r-container");
}

// create ribbon
// A szöveg
var elem1 = new RibbonElement('elem1','rgb(238,238,238)','rgb(210,210,210)');
// B szöveg
var elem2 = new RibbonElement('elem2','rgb(238,238,238)','rgb(210,210,210)');
// C szöveg
var elem3 = new RibbonElement('elem3','rgb(255,75,50)','rgb(193,58,39)','rgb(238,238,238)','rgb(210,210,210)');
// D szöveg
var elem4 = new RibbonElement('elem4','rgb(255,75,50)','rgb(193,58,39)');
// E szöveg
var elem5 = new RibbonElement('elem5','rgb(255,75,50)','rgb(193,58,39)');
// F szöveg
var elem6 = new RibbonElement('elem6','rgb(0,26,47)','rgb(0,11,20)');
// G szöveg
var elem7 = new RibbonElement('elem7','rgb(0,26,47)','rgb(0,11,20)');
// H szöveg
var elem8 = new RibbonElement('elem8','rgb(0,26,47)','rgb(0,11,20)');


//google maps
var map = null;
var markers = new Array();
var infowindows = new Array();

var markerLat = 47.510577;
var markerLng = 19.080176;
var centerWidth= 47.511606;
var centerLength= 19.080165;

var miniZoomLevel = 17;
var maxZoomLevel = 11;

function showMap() {
  if (map) return;
  
  var mapOptions = {
	zoom: miniZoomLevel,
	center: new google.maps.LatLng(centerWidth, centerLength),
	mapTypeId: google.maps.MapTypeId.ROADMAP,
	disableDefaultUI: true
  };
  map = new google.maps.Map(document.getElementById('map-container'),mapOptions);
  
  	marker = new google.maps.Marker({
	  position: new google.maps.LatLng(markerLat, markerLng),
	  map: map
	});
  	infowindow = new google.maps.InfoWindow({
	  content: '<div id="maps1"><h1>Zen Heads Kft.</h1>1071 Budapest<br/>Városligeti fasor 47-49</div>'
  	});
  	google.maps.event.addListener(marker, 'click', function(innerKey) {
	  return function() {
		  infowindow.open(map, marker);
	  };
	}());
}
$(document).ready(function(){
	
	ribbon.createRibbon([elem1,elem2,elem3,elem4,elem5,elem6,elem7,elem8]);
	
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
	showMap();
	
	if( $( window ).width() >= 1200)
	{
		$("#map-disable-control").click(function(){
			if( $( window ).width() > 650)
				$(this).hide();
			else
				return false;
		});
		$(document).click(function(e){
			var container = $("#map");

		    if (!container.is(e.target) // if the target of the click isn't the container...
		        && container.has(e.target).length === 0) // ... nor a descendant of the container
		    {
		    	$("#map-disable-control").show();
		    }
		});
		// ribbon display text on hover
		$(".r-text-function").mouseenter(function(){
			var id = $(this).attr("id");
			var textId = "#r-text-"+id;
			if(!$(textId).hasClass("highlight-text")){
				$(textId).addClass("highlight-text");
			}
		});
		$(".r-text-function").mouseleave(function(){
			$(".highlight-text").removeClass("highlight-text");
		});
	}
	else
	{
		// make bullets navigation on work's cards
		var cont = $("#r-container");
		var rows = cont.find(".r-static-row");
		var num = rows.length;
		var index = 0;
		var row; console.log(num);
		if(num > 1){
			row = $(rows.get(0));
			rows.not(row).hide(); // hide them except the first one
			
			// make bullets
			var bulletsHtml = "";
			var bulletsNavbar = $('<div id="bullets-navbar"></div>');
			cont.append(bulletsNavbar);
			for(var i=0; i< num; i++){
				bulletsHtml += '<span class="bullets-item btn blue-bg'+(i==0?' active':'')+'"></span>';
			}
			bulletsNavbar.html(bulletsHtml);
			var bullets = bulletsNavbar.find(".bullets-item");
			// bullets navigation
			$(".bullets-item").on("click", function(){
				index = bullets.index($(this));
				row = $(rows.get(index));
				rows.not(row).hide();
				row.fadeIn(800);
				bullets.removeClass("active");
				$(this).addClass("active");
			});
			
		}
	}
});