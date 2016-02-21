// ==UserScript==
// @name       Fart
// @namespace  croqueScript
// @version    0.2
// @description  script for all monsters fart in croquemonster
// @copyright  2012+, You
// ==/UserScript==
// Main popup
var popup = document.createElement('div');

popup.onclick = function(e) {
	popup.style.display = 'none';
};

// Button for display popup
button = window.document.createElement("button");
button.textContent = 'Fart';
button.onclick = function(e) {
	popup.style.display = 'block';
	monsters.forEach(function(current, index, array) {
		current.fart();
	});
};

// Content of popup
var table = document.createElement('table');

// Content of table
var titles = document.createElement('thead'), tbody = document.createElement('tbody');
tbody.style.color = 'black';

// Items of titles
var tr = document.createElement('tr'), thName = document.createElement('th'), thFart = document.createElement('th');
thName.textContent = 'Name';
thFart.textContent = 'Fart';

// Fill body of table
function fillBody(monsters) {
	var i = 0;
	for(i; i < monsters.length; i++) {
		var tdName = document.createElement('td'), tdFart = document.createElement('td'), tr = document.createElement('tr');
		tdName.textContent = monsters[i].name;
		tdFart.textContent = (monsters[i].isFart) ? 'ok' : 'ko';
		tr.appendChild(tdName);
		tr.appendChild(tdFart);
		// reference for replace line - to do another place ?
		monsters[i].HTMLLine = tr;
		tbody.appendChild(tr);
	}
}

// Manage monsters
var monsters = [];

function Monster(id, name) {
	this.id = id;
	this.name = name;
	this.isFart = false;
	this.HTMLLine = null;
}
Monster.prototype.fart = function() {
	var xhr = new XMLHttpRequest(), url = 'http://www.croquemonster.com/monster/' + this.id + '/fart', self = this;

	xhr.open('GET', url, true);
	/* xhr.responseType = "document"; */
	xhr.overrideMimeType('text/xml');
	xhr.onreadystatechange = function(e) {
		if (this.readyState == 4) {
			if(this.status == 200) {
				// Manage return and replace line in tbody
				self.isFart = !this.responseXML.documentElement.querySelector('a[href$="/fart"');
				self.HTMLLine.lastChild.textContent = (self.isFart) ? 'ok' : 'ko';
			}
		}
	};
	xhr.send();
};

// Get monsters
var monstersLink = window.document.querySelectorAll("h3>a"), i = 0, name, id;
for(i; i < monstersLink.length; i++) {
	name = monstersLink[i].textContent;
	id = monstersLink[i].href.match(/[0-9]+$/)[0];

	monsters.push(new Monster(id, name));
}

fillBody(monsters);

// Attachment
tr.appendChild(thName);
tr.appendChild(thFart);

titles.appendChild(tr);

table.appendChild(titles);
table.appendChild(tbody);

popup.appendChild(table);

document.body.appendChild(popup);

// Get button for attachment of button
var h1 = window.document.querySelector("h1[class=noMarg]");
h1.appendChild(button);

// Style definition
popup.className = 'summary-fart';
popup.style.display = 'none';
popup.style.position = 'fixed';
popup.style.top = 0;
popup.style.left = 0;
popup.style.width = '100%';
popup.style.height = '100%';
popup.style.paddingTop = '10%';

table.style.width = '50%';
table.style.marginLeft = 'auto';
table.style.marginRight = 'auto';
table.style.backgroundColor = '#1c5059';
table.style.textAlign = 'center';
