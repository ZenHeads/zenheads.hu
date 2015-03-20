
/* this is an icon holder object: ribbonElement */
function RibbonElement(id, color, shadowColor, middleColor, middleShadowColor){
	this.id = id;
	this.color = color;
	this.shadowColor = shadowColor;
	this.middleColor = middleColor ? middleColor : color;
	this.middleShadowColor = middleShadowColor ? middleShadowColor: shadowColor;
	this.size = ribbon.size;
}

function createRibbonElement(index){
	
	var textElement		= ribbon.texts.get(index);
	var element			= ribbon.elements.get(index);
	var elemContainer	= ribbon.elemContainers.get(index);
	var labelElement	= ribbon.labels.get(index);
	
	/* Calculated values from elem's width */
	labelElement.style.top = "115px";
	elemContainer.style.height = "158px"; // 110*sqrt(2)+2
	elemContainer.style.paddingLeft = "158px";
	element.style.left = "-32px";
	element.style.bottom = "1px";
	var ecw = 148;
	var ech = 81;
	
	/* width and height */
	element.style.width = "110px";
	element.style.height = "110px";

	elemContainer.style.left = (index*ecw)+'px';
	elemContainer.style.bottom = (index*ech)+'px';
	
	if(index>0){
		
		var middleElement	= ribbon.middleElements.get(index-1);
		var fakeElement		= ribbon.fakeElements.get(index-1);
		
		/* Calculated values from elem's width */
		middleElement.style.left = "48px";
		middleElement.style.top = "-81px";
		fakeElement.style.left = "50px";
		fakeElement.style.bottom = "-32px";
		/* width and height */
		middleElement.style.width = "110px";
		middleElement.style.height = "110px";
		fakeElement.style.width = "110px";
		fakeElement.style.height = "110px";
		
		var a = index*(2*ribbon.scrollDown+ribbon.moveDown)-ribbon.scrollDown+ribbon.startScroll;
		var b = (index+1)*(2*ribbon.scrollDown+ribbon.moveDown)-ribbon.scrollDown+ribbon.startScroll;
		
		/* text */
		textElement.setAttribute("data-start","opacity:0;");
		textElement.setAttribute("data-"+a,"opacity:0;");
		textElement.setAttribute("data-"+(a+50),"opacity:1;");
		if(Object.prototype.toString.call(ribbon.ribbonElements)==="[object Array]"){
			if(ribbon.ribbonElements.length-1 > index){
				textElement.setAttribute("data-"+(b-50),"opacity:1;");
				textElement.setAttribute("data-"+b,"opacity:0;");
			}
		}
		/* label */
		labelElement.setAttribute("data-"+a,"opacity:0;");
		labelElement.setAttribute("data-"+(a+50),"opacity:1;");
		
		/* element */
		var d = (index-1)*(2*ribbon.scrollDown+ribbon.moveDown)+ribbon.moveDown+ribbon.startScroll;
		element.setAttribute("data-"+d,"opacity:0;background-color:"+this.color+";transform: rotate(45deg) rotateX(-115deg) skew(22.5deg);-moz-transform: rotate(45deg) rotateX(-115deg) skew(22.5deg);-webkit-transform: rotate(45deg) rotateX(-115deg) skew(22.5deg);");
		element.setAttribute("data-"+(d+ribbon.scrollDown),"opacity:0;background-color:"+this.color+";transform: rotate(45deg) rotateX(-115deg) skew(22.5deg);-moz-transform: rotate(45deg) rotateX(-115deg) skew(22.5deg);-webkit-transform: rotate(45deg) rotateX(-115deg) skew(22.5deg);");
		element.setAttribute("data-"+(d+ribbon.scrollDown+1),"opacity:1;background-color:"+this.color+";transform: rotate(45deg) rotateX(-115deg) skew(22.5deg);-moz-transform: rotate(45deg) rotateX(-115deg) skew(22.5deg);-webkit-transform: rotate(45deg) rotateX(-115deg) skew(22.5deg);");
		element.setAttribute("data-"+(d+ribbon.scrollDown+2),"opacity:1;background-color:"+this.color+";transform: rotate(45deg) rotateX(-115deg) skew(22.5deg);-moz-transform: rotate(45deg) rotateX(-115deg) skew(22.5deg);-webkit-transform: rotate(45deg) rotateX(-115deg) skew(22.5deg);");
		element.setAttribute("data-"+(d+2*ribbon.scrollDown),"opacity:1;background-color:"+this.color+";transform:rotate(45deg) rotateX(0deg) skew(0deg);-moz-transform:rotate(45deg) rotateX(0deg) skew(0deg);-webkit-transform:rotate(45deg) rotateX(0deg) skew(0deg);");
		element.style.backgroundColor = this.color;
		
		/* middle element */
		middleElement.setAttribute("data-"+(d-1),"opacity:0;");
		middleElement.setAttribute("data-"+d,"opacity:1;background-color:"+this.middleShadowColor+";transform:rotate(45deg) rotateX(-180deg) skew(0deg);-moz-transform:rotate(45deg) rotateX(-180deg) skew(0deg);-webkit-transform:rotate(45deg) rotateX(-180deg) skew(0deg);");
		middleElement.setAttribute("data-"+(d+ribbon.scrollDown/2),"opacity:1;background-color:"+this.middleShadowColor+";transform: rotate(45deg) rotateX(-90deg) skew(-22.5deg);-moz-transform: rotate(45deg) rotateX(-90deg) skew(-22.5deg);-webkit-transform: rotate(45deg) rotateX(-90deg) skew(-22.5deg);");
		middleElement.setAttribute("data-"+(d+ribbon.scrollDown/2+1),"opacity:0;background-color:"+this.middleColor+";transform: rotate(45deg) rotateX(-90deg) skew(-22.5deg);-moz-transform: rotate(45deg) rotateX(-90deg) skew(-22.5deg);-webkit-transform: rotate(45deg) rotateX(-90deg) skew(-22.5deg);");
		middleElement.setAttribute("data-"+(d+ribbon.scrollDown-1),"opacity:0;background-color:"+this.middleColor+";transform: rotate(45deg) rotateX(-65deg) skew(-22.5deg);-moz-transform: rotate(45deg) rotateX(-65deg) skew(-22.5deg);-webkit-transform: rotate(45deg) rotateX(-65deg) skew(-22.5deg);");
		middleElement.setAttribute("data-"+(d+ribbon.scrollDown),"opacity:1;background-color:"+this.middleColor+";transform: rotate(45deg) rotateX(-65deg) skew(-22.5deg);-moz-transform: rotate(45deg) rotateX(-65deg) skew(-22.5deg);-webkit-transform: rotate(45deg) rotateX(-65deg) skew(-22.5deg);");
		middleElement.style.backgroundColor = this.middleColor;
		
		/* add fake element */
		if(index>1){
			fakeElement.setAttribute("data-"+(d-1),"opacity:0;");
		}
		fakeElement.setAttribute("data-"+d,"opacity:0;background-color:"+this.color+";transform: rotate(45deg) rotateX(0deg) skew(0deg);-moz-transform: rotate(45deg) rotateX(0deg) skew(0deg);-webkit-transform: rotate(45deg) rotateX(0deg) skew(0deg);");
		fakeElement.setAttribute("data-"+(d+ribbon.scrollDown/2),"opacity:0;background-color:"+this.color+";transform: rotate(45deg) rotateX(90deg) skew(22.5deg);-moz-transform: rotate(45deg) rotateX(90deg) skew(22.5deg);-webkit-transform: rotate(45deg) rotateX(90deg) skew(22.5deg);");
		fakeElement.setAttribute("data-"+(d+ribbon.scrollDown/2+1),"opacity:1;background-color:"+this.color+";transform: rotate(45deg) rotateX(90deg) skew(22.5deg);-moz-transform: rotate(45deg) rotateX(90deg) skew(22.5deg);-webkit-transform: rotate(45deg) rotateX(90deg) skew(22.5deg);");
		fakeElement.setAttribute("data-"+(d+ribbon.scrollDown),"opacity:1;background-color:"+this.color+";transform: rotate(45deg) rotateX(115deg) skew(22.5deg);-moz-transform: rotate(45deg) rotateX(115deg) skew(22.5deg);-webkit-transform: rotate(45deg) rotateX(115deg) skew(22.5deg);");
		fakeElement.setAttribute("data-"+(d+ribbon.scrollDown+1),"opacity:0;background-color:"+this.color+";transform: rotate(45deg) rotateX(115deg) skew(22.5deg);-moz-transform: rotate(45deg) rotateX(115deg) skew(22.5deg);-webkit-transform: rotate(45deg) rotateX(115deg) skew(22.5deg);");
		fakeElement.style.backgroundColor = this.color;
		
	} else {
		var c = (index+1)*(ribbon.scrollDown+ribbon.moveDown)+ribbon.startScroll;
		element.setAttribute("data-start","background-color:"+this.color+";");
		textElement.setAttribute("data-start","opacity:1;");
		textElement.setAttribute("data-"+(c-50),"opacity:1;");
		textElement.setAttribute("data-"+c,"opacity:0;");
	}
	
}
RibbonElement.prototype.createRibbonElement = createRibbonElement;



/* Set together the ribbonElements */

function Ribbon(containerId, startScroll, size, moveDown, scrollDown){
	this.container = document.getElementById(containerId);
	
	var width = $("#tools").innerWidth(); console.log(width);
	
	document.getElementById("work").style.marginLeft = "-"+(width/2)+"px";
	this.posLeft = 930*width/1440;
	this.posTop = -475;
	this.startScroll = startScroll ? startScroll : 0;
	this.size = size ? size : 110; // elements width and height in px
	this.moveDown = moveDown ? moveDown : 300;
	this.scrollDown = scrollDown ? scrollDown : 400;
	if(this.container === null){
		console.log("DOM element with the given container ID ("+containerId+") is not found!");
	} else {
		this.innerContainer = document.getElementById("r-inner-container");
	}
	this.ribbonElements = [];
	
	this.elements		= $(".r-elem");
	this.middleElements	= $(".r-middle");
	this.fakeElements	= $(".r-fake");
	this.texts			= $(".r-text");
	this.labels			= $(".r-label");
	this.elemContainers	= $(".r-e-container");
	
	/* fix height of #work-container */
	document.getElementById("work-container").style.height = "8860px";
	var work = document.getElementById("work");
	work.setAttribute("data-"+(startScroll-1),"position:absolute;top:0px;");
	work.setAttribute("data-"+startScroll,"position:fixed;top:50px;");
	//TODO 8269 calculation from elem width/height and elem num
	work.setAttribute("data-8269","position:fixed;top:50px;");
	work.setAttribute("data-8270","position:absolute;top:7772px;");
}

function createRibbon(ribbonElements){
	ribbon.ribbonElements = ribbonElements;
	var element;
	var i = 0;
	var typeOfRibbonElements = Object.prototype.toString.call(ribbonElements);
	// if ribbonElements is an array
	if(typeOfRibbonElements === "[object Array]"){
		while(i in ribbonElements){
			element = this.ribbonElements[i];
			element.createRibbonElement(i);
			i++;
		}
		var m = 0;	
		var attribute = "data-"+(this.startScroll==0 ? "start" : this.startScroll);
		for(var j=0; j < 2*(i-1); j++){
			var top = ribbon.posTop;
			var left = ribbon.posLeft;
			if(j>0 && j%2==1){
				// calculate top and left position
				m++;
				top = top + (m*78); // 50 is height of ribbon element 80
				left = left - (m*148); // calculated from width of ribbon element 135
				attribute = "data-"+(m*this.moveDown+(m-1)*2*this.scrollDown+this.startScroll);
			}
			else if(j>0 && j%2==0){
				// calculate top and left position
				top = top + (m*78); // 50 is height of ribbon element
				left = left - (m*148); // calculated from width of ribbon element
				attribute = "data-"+(m*this.moveDown+m*2*this.scrollDown+this.startScroll);
			}
			this.innerContainer.setAttribute(attribute,"left:"+left+"px;top:"+top+"px;");
		}
	}
	else if(typeOfRibbonElements === "[object Object]"){
		ribbonElements.createRibbonElement(i);
	}
	else {
		console.log("Type of the given resource is invalid! "+typeOfRibbonElements);
	}
	
	// load elements
	$(window).load(function(){
		$("#r-inner-container > div").show();
	});
}
Ribbon.prototype.createRibbon = createRibbon;



