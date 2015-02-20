

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
	var textElement = document.createElement('div');
	var labelElement = document.createElement('div');
	var textTitle = document.createElement('div');
	
	var zIndex = 30;
	
	/* element */
	element.id = this.id;
	element.className = "r-page";
	/* label */
	labelElement.id = this.id+"-label";
	labelElement.className = "r-label";
	labelElement.innerHTML = this.label; // label element data attributes
	this.innerContainer.appendChild(labelElement);
	this.innerContainer.appendChild(element);
	/* text element */
	textElement.className = "r-text";
	textTitle.className = "r-text-title";
	textTitle.innerHTML = this.title;
	textElement.appendChild(textTitle);
	var paragraph = document.createElement('p');
	paragraph.innerHTML = this.text;
	textElement.appendChild(paragraph); // text element data attributes
	
	if(index>0){
		
		zIndex = zIndex-index;
		
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
		element.setAttribute("data-"+d,"z-index:"+zIndex+";opacity:0;transform: rotate(45deg) rotateX(-115deg) skew(22.5deg);-moz-transform: rotate(45deg) rotateX(-115deg) skew(22.5deg);-webkit-transform: rotate(45deg) rotateX(-115deg) skew(22.5deg);");
		element.setAttribute("data-"+(d+ribbon.scrollDown),"opacity:0;transform: rotate(45deg) rotateX(-115deg) skew(22.5deg);-moz-transform: rotate(45deg) rotateX(-115deg) skew(22.5deg);-webkit-transform: rotate(45deg) rotateX(-115deg) skew(22.5deg);");
		element.setAttribute("data-"+(d+ribbon.scrollDown+1),"opacity:1;transform: rotate(45deg) rotateX(-115deg) skew(22.5deg);-moz-transform: rotate(45deg) rotateX(-115deg) skew(22.5deg);-webkit-transform: rotate(45deg) rotateX(-115deg) skew(22.5deg);");
		element.setAttribute("data-"+(d+ribbon.scrollDown+2),"opacity:1;transform: rotate(45deg) rotateX(-115deg) skew(22.5deg);-moz-transform: rotate(45deg) rotateX(-115deg) skew(22.5deg);-webkit-transform: rotate(45deg) rotateX(-115deg) skew(22.5deg);");
		element.setAttribute("data-"+(d+2*ribbon.scrollDown),"opacity:1;transform:rotate(45deg) rotateX(0deg) skew(0deg);-moz-transform:rotate(45deg) rotateX(0deg) skew(0deg);-webkit-transform:rotate(45deg) rotateX(0deg) skew(0deg);");
		
		
		/* add middle element */
		var middleElement = document.createElement('div');
		middleElement.id = "middle-"+index;
		middleElement.className = "r-page r-transform-origin-100-100 r-grey-bg";
		/* add transformation to middle element */
		middleElement.setAttribute("data-"+(d-1),"opacity:0;z-index:"+(zIndex-3)+";");
		middleElement.setAttribute("data-"+d,"opacity:1;background:"+this.shadowColor+";transform:rotate(45deg) rotateX(-180deg) skew(0deg);-moz-transform:rotate(45deg) rotateX(-180deg) skew(0deg);-webkit-transform:rotate(45deg) rotateX(-180deg) skew(0deg) translate3d(0,0,0);");
		// SZIN ELLENŐRZÉSE
		middleElement.setAttribute("data-"+(d+ribbon.scrollDown/2),"opacity:1;background:"+this.shadowColor+";transform: rotate(45deg) rotateX(-90deg) skew(-22.5deg);-moz-transform: rotate(45deg) rotateX(-90deg) skew(-22.5deg);-webkit-transform: rotate(45deg) rotateX(-90deg) skew(-22.5deg) translate3d(0,0,0);");
		// SZIN ELLENŐRZÉSE
		middleElement.setAttribute("data-"+(d+ribbon.scrollDown/2+1),"opacity:1;background:"+this.color+";transform: rotate(45deg) rotateX(-90deg) skew(-22.5deg);-moz-transform: rotate(45deg) rotateX(-90deg) skew(-22.5deg);-webkit-transform: rotate(45deg) rotateX(-90deg) skew(-22.5deg) translate3d(0,0,0));");
		middleElement.setAttribute("data-"+(d+ribbon.scrollDown),"background:"+this.color+";transform: rotate(45deg) rotateX(-65deg) skew(-22.5deg);-moz-transform: rotate(45deg) rotateX(-65deg) skew(-22.5deg);-webkit-transform: rotate(45deg) rotateX(-65deg) skew(-22.5deg) translate3d(0,0,0);");
		this.innerContainer.appendChild(middleElement);
		
		/* add fake element */
		var fakeElement = document.createElement('div');
		fakeElement.id = this.id+"-fake";
		fakeElement.className = "r-page r-transform-origin-100-0";
		if(index>1){
			fakeElement.setAttribute("data-"+(d-1),"opacity:0;z-index:-1;");
		}
		fakeElement.setAttribute("data-"+d,"opacity:1;z-index:"+(zIndex-4)+";transform: rotate(45deg) rotateX(0deg) skew(0deg);-moz-transform: rotate(45deg) rotateX(0deg) skew(0deg);-webkit-transform: rotate(45deg) rotateX(0deg) skew(0deg);");
		fakeElement.setAttribute("data-"+(d+ribbon.scrollDown/2),"opacity:1;z-index:"+(zIndex-4)+";transform: rotate(45deg) rotateX(90deg) skew(22.5deg);-moz-transform: rotate(45deg) rotateX(90deg) skew(22.5deg);-webkit-transform: rotate(45deg) rotateX(90deg) skew(22.5deg);");
		fakeElement.setAttribute("data-"+(d+ribbon.scrollDown/2+1),"opacity:1;z-index:"+(zIndex-2)+";transform: rotate(45deg) rotateX(90deg) skew(22.5deg);-moz-transform: rotate(45deg) rotateX(90deg) skew(22.5deg);-webkit-transform: rotate(45deg) rotateX(90deg) skew(22.5deg);");
		fakeElement.setAttribute("data-"+(d+ribbon.scrollDown),"z-index:"+(zIndex-2)+";transform: rotate(45deg) rotateX(115deg) skew(22.5deg);-moz-transform: rotate(45deg) rotateX(115deg) skew(22.5deg);-webkit-transform: rotate(45deg) rotateX(115deg) skew(22.5deg);");
		fakeElement.setAttribute("data-"+(d+ribbon.scrollDown+1),"z-index:"+(zIndex-5)+";transform: rotate(45deg) rotateX(115deg) skew(22.5deg);-moz-transform: rotate(45deg) rotateX(115deg) skew(22.5deg);-webkit-transform: rotate(45deg) rotateX(115deg) skew(22.5deg);");
		this.innerContainer.appendChild(fakeElement);
		
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


// A szöveg
var elem1 = new RibbonElement('elem1','rgb(238,238,238)','rgb(210,210,210)','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in nibh vitae orci finibus finibus. Pellentesque tempus ex nec gravida rutrum. Maecenas consectetur sapien neque, ac eleifend est feugiat eget. Praesent ac sapien varius, facilisis justo eleifend, placerat odio. Aenean at viverra diam. In consectetur vehicula dignissim. Curabitur congue ullamcorper velit et pellentesque. Duis dictum ipsum vitae ex mattis consequat. Cras semper, lectus eu iaculis euismod, quam enim gravida dolor, a tempus velit eros nec sem. Nam at urna iaculis, tincidunt augue quis, placerat tellus.','start','start');
// B szöveg
var elem2 = new RibbonElement('elem2','rgb(238,238,238)','rgb(210,210,210)','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in nibh vitae orci finibus finibus. Pellentesque tempus ex nec gravida rutrum. Maecenas consectetur sapien neque, ac eleifend est feugiat eget. Praesent ac sapien varius, facilisis justo eleifend, placerat odio. Aenean at viverra diam. In consectetur vehicula dignissim. Curabitur congue ullamcorper velit et pellentesque. Duis dictum ipsum vitae ex mattis consequat. Cras semper, lectus eu iaculis euismod, quam enim gravida dolor, a tempus velit eros nec sem. Nam at urna iaculis, tincidunt augue quis, placerat tellus.','specification','specification');
// C szöveg
var elem3 = new RibbonElement('elem3','rgb(238,238,238)','rgb(210,210,210)','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in nibh vitae orci finibus finibus. Pellentesque tempus ex nec gravida rutrum. Maecenas consectetur sapien neque, ac eleifend est feugiat eget. Praesent ac sapien varius, facilisis justo eleifend, placerat odio. Aenean at viverra diam. In consectetur vehicula dignissim. Curabitur congue ullamcorper velit et pellentesque. Duis dictum ipsum vitae ex mattis consequat. Cras semper, lectus eu iaculis euismod, quam enim gravida dolor, a tempus velit eros nec sem. Nam at urna iaculis, tincidunt augue quis, placerat tellus.','wireframe & ux','wireframe & ux');
// D szöveg
var elem4 = new RibbonElement('elem4','rgb(255,75,50)','rgb(225,70,50)','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in nibh vitae orci finibus finibus. Pellentesque tempus ex nec gravida rutrum. Maecenas consectetur sapien neque, ac eleifend est feugiat eget. Praesent ac sapien varius, facilisis justo eleifend, placerat odio. Aenean at viverra diam. In consectetur vehicula dignissim. Curabitur congue ullamcorper velit et pellentesque. Duis dictum ipsum vitae ex mattis consequat. Cras semper, lectus eu iaculis euismod, quam enim gravida dolor, a tempus velit eros nec sem. Nam at urna iaculis, tincidunt augue quis, placerat tellus.','ui & gfx','ui & gfx');
// E szöveg
var elem5 = new RibbonElement('elem5','rgb(255,75,50)','rgb(225,70,50)','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in nibh vitae orci finibus finibus. Pellentesque tempus ex nec gravida rutrum. Maecenas consectetur sapien neque, ac eleifend est feugiat eget. Praesent ac sapien varius, facilisis justo eleifend, placerat odio. Aenean at viverra diam. In consectetur vehicula dignissim. Curabitur congue ullamcorper velit et pellentesque. Duis dictum ipsum vitae ex mattis consequat. Cras semper, lectus eu iaculis euismod, quam enim gravida dolor, a tempus velit eros nec sem. Nam at urna iaculis, tincidunt augue quis, placerat tellus.','planE','plan');
// F szöveg
var elem6 = new RibbonElement('elem6','rgb(0,26,47)','rgb(0,11,20)','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in nibh vitae orci finibus finibus. Pellentesque tempus ex nec gravida rutrum. Maecenas consectetur sapien neque, ac eleifend est feugiat eget. Praesent ac sapien varius, facilisis justo eleifend, placerat odio. Aenean at viverra diam. In consectetur vehicula dignissim. Curabitur congue ullamcorper velit et pellentesque. Duis dictum ipsum vitae ex mattis consequat. Cras semper, lectus eu iaculis euismod, quam enim gravida dolor, a tempus velit eros nec sem. Nam at urna iaculis, tincidunt augue quis, placerat tellus.','development','development');
// G szöveg
var elem7 = new RibbonElement('elem7','rgb(0,26,47)','rgb(0,11,20)','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in nibh vitae orci finibus finibus. Pellentesque tempus ex nec gravida rutrum. Maecenas consectetur sapien neque, ac eleifend est feugiat eget. Praesent ac sapien varius, facilisis justo eleifend, placerat odio. Aenean at viverra diam. In consectetur vehicula dignissim. Curabitur congue ullamcorper velit et pellentesque. Duis dictum ipsum vitae ex mattis consequat. Cras semper, lectus eu iaculis euismod, quam enim gravida dolor, a tempus velit eros nec sem. Nam at urna iaculis, tincidunt augue quis, placerat tellus.','user feedback','user feedback');
// H szöveg
var elem8 = new RibbonElement('elem8','rgb(0,26,47)','rgb(0,11,20)','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in nibh vitae orci finibus finibus. Pellentesque tempus ex nec gravida rutrum. Maecenas consectetur sapien neque, ac eleifend est feugiat eget. Praesent ac sapien varius, facilisis justo eleifend, placerat odio. Aenean at viverra diam. In consectetur vehicula dignissim. Curabitur congue ullamcorper velit et pellentesque. Duis dictum ipsum vitae ex mattis consequat. Cras semper, lectus eu iaculis euismod, quam enim gravida dolor, a tempus velit eros nec sem. Nam at urna iaculis, tincidunt augue quis, placerat tellus.','launch','launch');

var ribbon = new Ribbon("r-container", 910, -340, 1145);
ribbon.createRibbon([elem1,elem2,elem3,elem4,elem5,elem6,elem7,elem8]);
