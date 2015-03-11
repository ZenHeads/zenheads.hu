/* this is an icon holder object: ribbonElement */
function RibbonElement(id, color, shadowColor, text, title, label){
	this.id = id;
	this.color = color;
	this.shadowColor = shadowColor;
	this.text = text;
	this.title = title;
	this.label = label;
}

function createRibbonElement(index,container){
	var row = document.createElement('div');
	row.className = "r-static-row";
	this.container = container;
	var element = document.createElement('div');
	var textElement = document.createElement('div');
	var labelElement = document.createElement('div');
	var textTitle = document.createElement('div');
	
	
	
	/* element */
	element.id = "static-"+this.id;
	element.className = "r-static-page";
	/* label */
	labelElement.id = this.id+"-label";
	labelElement.className = "r-static-label";
	labelElement.innerHTML = this.label; // label element data attributes
	
	/* text element */
	textElement.id = "r-static-text-"+this.id;
	textElement.className = "r-static-text";
	textTitle.className = "r-text-title";
	textTitle.innerHTML = this.title;
	textElement.appendChild(textTitle);
	var paragraph = document.createElement('p');
	paragraph.innerHTML = this.text;
	textElement.appendChild(paragraph); // text element data attributes
	
	row.appendChild(textElement);
	row.appendChild(element);
	row.appendChild(labelElement);
	
	this.container.appendChild(row);

}
RibbonElement.prototype.createRibbonElement = createRibbonElement;



/* Set together the ribbonElements */

function Ribbon(containerId){
	this.container = document.getElementById(containerId);
		if(this.container === null){
		console.log("DOM element with the given container ID ("+containerId+") is not found!");
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
			element.createRibbonElement(i,this.container);
			i++;
		}
	}
	else if(typeOfRibbonElements === "[object Object]"){
		ribbonElements.createRibbonElement(i,this.container);
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
