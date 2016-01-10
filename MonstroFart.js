// ==UserScript==
// @name       Fart
// @namespace  croqueScript
// @version    0.1
// @description  script for all monsters fart in croquemonster
// @include     http://www.croquemonster.com/monster
// @copyright  2012+, You
// ==/UserScript==

var Monsters = [];
/**
* Function to create html element
* @return HTMLElement
* */
function element(name) {
	return document.createElement(name);
}
/**
* Constructor
**/
function Frame() {
	this.body = window.document.createElement('div');
	this.elements = [];

	document.body.appendChild(this.body);
    
    this.button = window.document.createElement('button');
    this.button.textContent ='close';
    var self= this;
    this.button.onclick = function(e) {
        self.hide.apply(self);
    }
	this.body.appendChild(this.button);

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
		htmlElement.style.top = '20%';
		htmlElement.style.margin = 'auto';
		htmlElement.style.backgroundColor = "grey";
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

function createHTMLList(list) {
	var ul = window.document.createElement("ul");
	for(var i = 0; i < list.length; i++) {
		var li = window.document.createElement("li");
		li.innerHTML = list[i].toString();
		ul.appendChild(li);
	}
	ul.style.position ="fixed";
	ul.style.top = 0;
	return ul;
}
        
//get path to fart
function linkToFart(link) {
	return (link.href == undefined)? "" : link.href+'/fart';
}

function callback(data) {
	var success = data.querySelector("div[class=content] a:last-child"),
	monster = data.querySelector("h1.noMarg").firstChild.textContent.substring(8),
	tmp = {name : monster, fart : '-', toString: function(){ return this.name+':'+this.fart;}};
	if(success) {
			tmp.fart = 'Fart';
	}
	Monsters.push(tmp);
}

function fart(url) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.responseType = "document";
	xhr.onreadystatechange = function(e) {
		if (this.readyState == 4) {
			if(this.status == 200) {
				callback(this.responseXML);
			}
			// else
				// callback(this.responseXML);
		}
		checkMonster();
	};
	xhr.send();
}

function checkMonster() {
	if(Monsters.length == 10) {
		var list = createHTMLList(Monsters), f = new Frame();
		f.add(list);
		f.show();
		//setTimeout(function(){f.hide(); f.removeAll()}, 5000);
	} 
}

//get title & create button
var h1 = window.document.querySelector("h1[class=noMarg]"),
	monstersLink = window.document.querySelectorAll("h3>a"),
	button = window.document.createElement("button");

//customize button
button.innerHTML = 'Fart';
button.onclick = function(e) {
	for(var i in monstersLink) {
		(function(preLink) {
			var link = linkToFart(preLink);
			if(link != "")
				fart(link);
		})(monstersLink[i]);
	}
};

//add button in title
h1.appendChild(button);
