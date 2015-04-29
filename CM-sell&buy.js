// ==UserScript==
// @name       Sell & buy CM
// @namespace  croqueScript
// @version    0.2
// @description  script for send or buy item in croquemonster
// @include     http://www.croquemonster.com/exchange*
// @copyright  2012+, You
// ==/UserScript==

(function() {
	var DOMManipulation = {
		/**
		 * Function to create html's select
		 * @param options's array
		 * @return select (the HTMLElement)
		 * */
		selectElement: function(optionsList) {
			var select = document.createElement("select");
			
			for(var i in optionsList) {
				if(!isNaN(i) && (optionsList[i] != 'undefined' && optionsList[i] != undefined)) {
					var option = document.createElement("option");
					option.value = i;
					option.text = optionsList[i];
					select.add(option);
				}
			}
			return select;
		},
		/**
		 * Function to catch object's label
		 * */
		objectLabels: function() {
			var h1 = document.querySelectorAll('.txt h1'), result = [], index = 0;
			//FIXME loop is strange
			for(var i in h1) {
				result[index] = h1[i].innerHTML;
				index++;
			}
			return result;
		},
				
		/**
		 * Function to create Frame
		 * */
		Frame: function() {
			this.body = document.createElement('div');
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
	},
	
	Job = function() {
		var _labels = DOMManipulation.objectLabels();
		this.labels = _labels;
		/**
		 * Function to buy object
		 * idObject id of object
		 * numberBuy number of object will be buy
		 * */
		this.buy = function(idObject, numberBuy) {
			for(var i = 0; i < numberBuy; i++) {
				Exchange.increment(idObject);
			}
		}
	};
	
	DOMManipulation.Frame.prototype.add = function(htmlElement) {
		this.elements.push(htmlElement);
		this.body.appendChild(htmlElement);

		htmlElement.style.position = 'relative';
		htmlElement.style.top = '50%';
		htmlElement.style.margin = 'auto';
	};
	DOMManipulation.Frame.prototype.removeAll = function() {
		while(this.elements.length > 0) {
			this.elements.pop();
			this.body.removeChild(this.body.lastChild);
		}
	};
	DOMManipulation.Frame.prototype.show = function() {
		this.body.style.display = 'inline';
	};
	DOMManipulation.Frame.prototype.hide = function() {
		this.body.style.display = 'none';
	};
	
	this.run = function() {
		var title = document.querySelector('.noMarg'), button = document.createElement('button'),
		job = new Job,
		select = DOMManipulation.selectElement(job.labels),
		f = new DOMManipulation.Frame;
		
		function selectedBuy() {
			f.hide();
			var value = select.selectedIndex,
			num = prompt(['Quantité de ', job.labels[value], ' à acheter : '].join('')),
			result = false;
			
			//increment api croquemonster
			job.buy(value, num);
			
			//get quantity to be buy
			var qte = document.querySelector(['#my', value,' .qte'].join(''));
			if(qte) {
				result = confirm(['Acheter ', qte.innerHTML, ' de ', job.labels[value], ' ?'].join(''));
			}
			if(result) {
				Exchange.validate(document.querySelector('.list .actionButton'));
			}
		};
		
		if(window.location.href != "http://www.croquemonster.com/exchange?v=sell" )
			button.innerHTML='Buy';
		else
			button.innerHTML='Sell';

		/* Add button to DOM */
		title.parentNode.insertBefore(button, title.nextSibling);
		
		f.add(select);
		f.hide();
		//TODO manage by button
		select.addEventListener('click', selectedBuy);
		button.addEventListener('click', function() { f.show(); });
	}
	
	this.run();
})();
