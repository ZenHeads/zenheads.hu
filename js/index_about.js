
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
//	showMap();
	
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
	}
});