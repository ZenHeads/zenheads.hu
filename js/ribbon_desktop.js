var zIndex = 60;

/* this is an icon holder object: ribbonElement */
function RibbonElement(id, color, shadowColor, text, title, label){
	this.id = id;
	this.color = color;
	this.shadowColor = shadowColor;
	this.text = text;
	this.title = title;
	this.label = label;
}

function createRibbonElement(index,container,innerContainer){
	this.container = container;
	this.innerContainer = innerContainer;
	var element = document.createElement('div');
	var elementContainer = document.createElement('div');
	var textElement = document.createElement('div');
	var labelElement = document.createElement('div');
	var textTitle = document.createElement('div');
	
	
	
	/* element */
	element.id = this.id;
	element.className = "r-page r-text-function";
	/* label */
	labelElement.id = this.id+"-label";
	labelElement.className = "r-label";
	labelElement.innerHTML = this.label; // label element data attributes
	this.innerContainer.appendChild(labelElement);
	elementContainer.appendChild(element);
	this.innerContainer.appendChild(elementContainer);
	/* text element */
	textElement.id = "r-text-"+this.id;
	textElement.className = "r-text";
	textTitle.className = "r-text-title";
	textTitle.innerHTML = this.title;
	textElement.appendChild(textTitle);
	var paragraph = document.createElement('p');
	paragraph.innerHTML = this.text;
	textElement.appendChild(paragraph); // text element data attributes
	
	if(index>0){
		
		zIndex -= 1;
		
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
		element.className += " r-transform-origin-100-100";
		element.style.zIndex = zIndex;
		zIndex -= 1;
		elementContainer.style.zIndex = zIndex;
		elementContainer.className = "r-e-container";
		elementContainer.id = "elem-container-"+index;
		element.setAttribute("data-"+d,"opacity:0;transform: rotate(45deg) rotateX(-115deg) skew(22.5deg);-moz-transform: rotate(45deg) rotateX(-115deg) skew(22.5deg);-webkit-transform: rotate(45deg) rotateX(-115deg) skew(22.5deg) translate3d(0,0,0);");
		element.setAttribute("data-"+(d+ribbon.scrollDown),"opacity:0;transform: rotate(45deg) rotateX(-115deg) skew(22.5deg);-moz-transform: rotate(45deg) rotateX(-115deg) skew(22.5deg);-webkit-transform: rotate(45deg) rotateX(-115deg) skew(22.5deg) translate3d(0,0,0);");
		element.setAttribute("data-"+(d+ribbon.scrollDown+1),"opacity:1;transform: rotate(45deg) rotateX(-115deg) skew(22.5deg);-moz-transform: rotate(45deg) rotateX(-115deg) skew(22.5deg);-webkit-transform: rotate(45deg) rotateX(-115deg) skew(22.5deg) translate3d(0,0,0);");
		element.setAttribute("data-"+(d+ribbon.scrollDown+2),"opacity:1;transform: rotate(45deg) rotateX(-115deg) skew(22.5deg);-moz-transform: rotate(45deg) rotateX(-115deg) skew(22.5deg);-webkit-transform: rotate(45deg) rotateX(-115deg) skew(22.5deg) translate3d(0,0,0);");
		element.setAttribute("data-"+(d+2*ribbon.scrollDown),"opacity:1;transform:rotate(45deg) rotateX(0deg) skew(0deg);-moz-transform:rotate(45deg) rotateX(0deg) skew(0deg);-webkit-transform:rotate(45deg) rotateX(0deg) skew(0deg) translate3d(0,0,0);");
		zIndex -= 1;
		
		/* add middle element */
		var middleElement = document.createElement('div');
		var middleElementContainer = document.createElement('div');
		middleElementContainer.className = "r-e-container";
		middleElementContainer.id = "middle-container-"+index;
		middleElement.id = "middle-"+index;
		middleElement.className = "r-page r-transform-origin-100-100 r-grey-bg";
		/* add transformation to middle element */
		middleElement.style.zIndex = zIndex;
		zIndex -= 1;
		middleElementContainer.style.zIndex = zIndex;
		middleElement.setAttribute("data-"+(d-1),"opacity:0;");
		middleElement.setAttribute("data-"+d,"opacity:1;background:"+this.shadowColor+";transform:rotate(45deg) rotateX(-180deg) skew(0deg);-moz-transform:rotate(45deg) rotateX(-180deg) skew(0deg);-webkit-transform:rotate(45deg) rotateX(-180deg) skew(0deg) translate3d(0,0,0);");
		// SZIN ELLENŐRZÉSE
		middleElement.setAttribute("data-"+(d+ribbon.scrollDown/2),"opacity:1;background:"+this.shadowColor+";transform: rotate(45deg) rotateX(-90deg) skew(-22.5deg);-moz-transform: rotate(45deg) rotateX(-90deg) skew(-22.5deg);-webkit-transform: rotate(45deg) rotateX(-90deg) skew(-22.5deg) translate3d(0,0,0);");
		// SZIN ELLENŐRZÉSE
		middleElement.setAttribute("data-"+(d+ribbon.scrollDown/2+1),"opacity:0;background:"+this.color+";transform: rotate(45deg) rotateX(-90deg) skew(-22.5deg);-moz-transform: rotate(45deg) rotateX(-90deg) skew(-22.5deg);-webkit-transform: rotate(45deg) rotateX(-90deg) skew(-22.5deg) translate3d(0,0,0);");
		middleElement.setAttribute("data-"+(d+ribbon.scrollDown-1),"opacity:0;background:"+this.color+";transform: rotate(45deg) rotateX(-65deg) skew(-22.5deg);-moz-transform: rotate(45deg) rotateX(-65deg) skew(-22.5deg);-webkit-transform: rotate(45deg) rotateX(-65deg) skew(-22.5deg) translate3d(0,0,0);");
		middleElement.setAttribute("data-"+(d+ribbon.scrollDown),"opacity:1;background:"+this.color+";transform: rotate(45deg) rotateX(-65deg) skew(-22.5deg);-moz-transform: rotate(45deg) rotateX(-65deg) skew(-22.5deg);-webkit-transform: rotate(45deg) rotateX(-65deg) skew(-22.5deg) translate3d(0,0,0);");
		middleElementContainer.appendChild(middleElement);
		this.innerContainer.appendChild(middleElementContainer);
		zIndex -= 1;
		
		/* add fake element */
		var fakeElement = document.createElement('div');
		var fakeElementContainer = document.createElement('div');
		fakeElementContainer.className = "r-e-container";
		fakeElementContainer.id = "fake-container-"+index;
		fakeElement.id = this.id+"-fake";
		fakeElement.className = "r-page r-transform-origin-100-0";
		if(index>1){
			fakeElement.setAttribute("data-"+(d-1),"opacity:0;");
		}
		fakeElement.style.zIndex = zIndex;
		zIndex -= 1;
		fakeElementContainer.style.zIndex = zIndex;
		fakeElement.setAttribute("data-"+d,"opacity:0;transform: rotate(45deg) rotateX(0deg) skew(0deg);-moz-transform: rotate(45deg) rotateX(0deg) skew(0deg);-webkit-transform: rotate(45deg) rotateX(0deg) skew(0deg) translate3d(0,0,0);");
		fakeElement.setAttribute("data-"+(d+ribbon.scrollDown/2),"opacity:0;transform: rotate(45deg) rotateX(90deg) skew(22.5deg);-moz-transform: rotate(45deg) rotateX(90deg) skew(22.5deg);-webkit-transform: rotate(45deg) rotateX(90deg) skew(22.5deg) translate3d(0,0,0);");
		fakeElement.setAttribute("data-"+(d+ribbon.scrollDown/2+1),"opacity:1;transform: rotate(45deg) rotateX(90deg) skew(22.5deg);-moz-transform: rotate(45deg) rotateX(90deg) skew(22.5deg);-webkit-transform: rotate(45deg) rotateX(90deg) skew(22.5deg) translate3d(0,0,0);");
		fakeElement.setAttribute("data-"+(d+ribbon.scrollDown),"opacity:1;transform: rotate(45deg) rotateX(115deg) skew(22.5deg);-moz-transform: rotate(45deg) rotateX(115deg) skew(22.5deg);-webkit-transform: rotate(45deg) rotateX(115deg) skew(22.5deg) translate3d(0,0,0);");
		fakeElement.setAttribute("data-"+(d+ribbon.scrollDown+1),"opacity:0;transform: rotate(45deg) rotateX(115deg) skew(22.5deg);-moz-transform: rotate(45deg) rotateX(115deg) skew(22.5deg);-webkit-transform: rotate(45deg) rotateX(115deg) skew(22.5deg) translate3d(0,0,0);");
		fakeElementContainer.appendChild(fakeElement);
		this.innerContainer.appendChild(fakeElementContainer);
		zIndex -= 1;
		
	} else {
		var c = (index+1)*(ribbon.scrollDown+ribbon.moveDown)+ribbon.startScroll;
		textElement.setAttribute("data-start","opacity:1;");
		textElement.setAttribute("data-"+(c-50),"opacity:1;");
		textElement.setAttribute("data-"+c,"opacity:0;");
		element.className += " r-rotate";
	}
	
	
	this.container.appendChild(textElement);
}
RibbonElement.prototype.createRibbonElement = createRibbonElement;



/* Set together the ribbonElements */

function Ribbon(containerId, posLeft, posTop, startScroll, moveDown, scrollDown){
	this.container = document.getElementById(containerId);
	this.posLeft = posLeft ? posLeft : 0;
	this.posTop = posTop ? posTop : 0;
	this.startScroll = startScroll ? startScroll : 0;
	this.moveDown = moveDown ? moveDown : 300;
	this.scrollDown = scrollDown ? scrollDown : 400;
	if(this.container === null){
		console.log("DOM element with the given container ID ("+containerId+") is not found!");
	} else {
		var innerContainer = document.createElement('div');
		innerContainer.className = "inner-container";
		innerContainer.id = "r-inner-container";
		this.innerContainer = innerContainer; // innerContainer data attributes
		this.container.appendChild(innerContainer);
	}
	this.ribbonElements = [];
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
			element.createRibbonElement(i,this.container,this.innerContainer);
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
				top = top + (m*80); // 50 is height of ribbon element
				left = left - (m*135); // calculated from width of ribbon element
				attribute = "data-"+(m*this.moveDown+(m-1)*2*this.scrollDown+this.startScroll);
			}
			else if(j>0 && j%2==0){
				// calculate top and left position
				top = top + (m*80); // 50 is height of ribbon element
				left = left - (m*135); // calculated from width of ribbon element
				attribute = "data-"+(m*this.moveDown+m*2*this.scrollDown+this.startScroll);
			}
			
			this.innerContainer.setAttribute(attribute,"left:"+left+"px;top:"+top+"px;");
		}
	}
	else if(typeOfRibbonElements === "[object Object]"){
		ribbonElements.createRibbonElement(i,this.container,this.innerContainer);
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


