// ==UserScript==
// @name       Sell & buy CM
// @namespace  croqueScript
// @version    0.1
// @description  script for send or buy item in croquemonster
// @include     http://www.croquemonster.com/exchange*
// @copyright  2012+, You
// ==/UserScript==

/**
* Function to buy object
* @param idObject id of object
* @param numberBuy number of object will be buy
* */
function buy(idObject, numberBuy) {
	for(var i = 0; i < numberBuy; i++) {
			Exchange.increment(idObject);
	}
}

/**
* Function to create html element
* @return HTMLElement
* */
function element(name) {
	return document.createElement(name);
}

/**
* Function to create html's select
* @param options's array
* @return select (the HTMLElement)
* */
function selectElement(optionsList) {
	var select = element("select");
	
	for(var i in optionsList) {
		if(!isNaN(i) &&
		 (optionsList[i] != 'undefined' && optionsList[i] != undefined)) {
			var option = element("option");
			option.value = i;
			option.text = optionsList[i];
			select.add(option);
		}
	}
	return select;
}

/**
* Constructor
**/
function Frame() {
	this.body = element('div');
	this.elements = [];

	document.body.appendChild(this.body);

	this.body.style.position = 'fixed';
	this.body.style.top = '25%';
	this.body.style.left = '25%';

	this.body.style.height = '50%';
	this.body.style.width = '50%';
	this.body.style.margin = 'auto';

	this.body.style.backgroundColor = 'black';
	this.body.style.opacity = '0.9';

	this.body.style.textAlign = "center";
}

Frame.prototype = {
	add: function(htmlElement) {
		this.elements.push(htmlElement);
		this.body.appendChild(htmlElement);
		
		htmlElement.style.position = 'relative';
		htmlElement.style.top = '50%';
		htmlElement.style.margin = 'auto';
	},
	removeAll: function() {
		while(this.elements.length > 0) {
			this.elements.pop();
			this.body.removeChild(this.body.lastChild);
		}
	},
	
	show: function() {
		this.body.style.display = 'inline';
	},
	hide: function() {
		this.body.style.display = 'none';
	}
};

/**
* Function to catch object's label
* */
function objectLabels() {
	var h1 = document.querySelectorAll('.txt h1'), result = [], index = 0;
	for(var i in h1) {
		result[index] = h1[i].innerHTML;
		index++;
	}
	return result;
}

function queryToUser(str) {
	var result = prompt(str);
	if(result)
		return result;
	throw "Annulé";
}

var title = document.querySelector('.noMarg'), button = element('button');
title.parentNode.insertBefore(button, title.nextSibling);

button.onclick = function() {
	try {
		var listObject = objectLabels(),
		select = selectElement(listObject),
		f = new Frame, objectValue;
		
		select.onclick = function(e) {
			objectValue = select.selectedIndex;
			f.removeAll();
			f.hide();
			var num = queryToUser('Quantité de ' + listObject[objectValue] + ' à acheter : '),
				result = buy(objectValue, num);
			var qte = document.querySelector('#my' + objectValue + ' .qte'),
				result = false;
			
			if(qte)
				result = confirm('Acheter ' + qte.innerHTML + ' de ' + listObject[objectValue] + ' ?');
			if(result)
				Exchange.validate(document.querySelector('.list .actionButton'));
		}
		f.add(select);
		f.show();
	}catch(err) {
		console.log(err);
		alert(err);
	}
};

if(window.location.href != "http://www.croquemonster.com/exchange?v=sell" )
	button.innerHTML='Buy';
else
	button.innerHTML='Sell';
