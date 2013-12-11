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

function createHTMLList(list) {
	var ul = window.document.createElement("ul");
	for(var i in list) {
		var li = window.document.createElement("li");
		li.innerHTML = String(list[i]);
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
	monster = window.document.querySelector(".noMarg").firstChild.textContent.substring(8);
	if(success)
		Monsters.push({monster : " Fart" });
	else
		Monsters.push({monster : " - " });
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
					else
							callback(this.responseXML);
			}
	};
	xhr.send();
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
			if(Monsters.length == 10) {
				var list = createHTMLList(Monsters), frame = new Frame;
				frame.add(list);
			}
		})(monstersLink[i]);
	}
};

//add button in title
h1.appendChild(button);
