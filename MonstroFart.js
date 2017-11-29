// ==UserScript==
// @name       Fart
// @namespace  croqueScript
// @version    0.3
// @description  script for all monsters fart in croquemonster
// @copyright  2012+, You
// ==/UserScript==
(function(doc) {
    class Monster {
        constructor(id, name) {
            this.id = id;
            this.name = name;
            this.isFart = false;
            this.HTMLLine = null;
        }

        fart() {
            const url = `http://www.croquemonster.com/monster/${this.id}/fart`,
            xhr = new XMLHttpRequest(),
            self = this;

            xhr.open('GET', url, true);
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
        }
    };

    class Main {
        constructor(doc) {
            var document = doc;
            this.initUI();
            this.initStyle();
            this.initMonsters();

            this.createTitleOfTable();
            this.fillBodyOfTable(this.monsters);
            this.listener();
        }

        initMonsters() {
            // Manage monsters
            this.monsters = [];

            // Get monsters
            const monstersLink = document.querySelectorAll("h3>a");
            let i = 0, name, id;
            for(i; i < monstersLink.length; i++) {
                name = monstersLink[i].textContent;
                id = monstersLink[i].href.match(/[0-9]+$/)[0];

                this.monsters.push(new Monster(id, name));
            }

            return this;
        }

        initUI() {
            // Create table
            this.popup = document.createElement('div');
            this.createEmptyTable();
            this.popup.appendChild(this.table);
            document.body.appendChild(this.popup);

            // Create button
            this.createButton();
            const h1 = window.document.querySelector("h1[class=noMarg]");
            h1.appendChild(this.button);

            return this;
        }

        initStyle() {
            this.popup.className = 'summary-fart';
            this.popup.style.display = 'none';
            this.popup.style.position = 'fixed';
            this.popup.style.top = 0;
            this.popup.style.left = 0;
            this.popup.style.width = '100%';
            this.popup.style.height = '100%';
            this.popup.style.paddingTop = '10%';

            this.table.style.width = '50%';
            this.table.style.marginLeft = 'auto';
            this.table.style.marginRight = 'auto';
            this.table.style.backgroundColor = '#1c5059';
            this.table.style.textAlign = 'center';

            this.tbody.style.color = 'black';
            return this;
        }

        listener() {
            const self = this;

            this.popup.addEventListener('click', this.changeDisplay, false);

            this.button.addEventListener('click', () => {
                this.popup.dispatchEvent(new MouseEvent("click", {
                    bubbles: true,
                    cancelable: true,
                    view: window,
                }));

                this.monsters.forEach(function(current, index, array) {
                    current.fart();
                });
            });
        }

        changeDisplay(evt) {
            evt.currentTarget.style.display = (evt.currentTarget.style.display == 'none') ? 'block' : 'none';
        }

        fillBodyOfTable(monsters) {
            this.removeAllChild(this.tbody);

            for(let i = 0; i < monsters.length; i++) {
                const tdName = document.createElement('td'), tdFart = document.createElement('td'), tr = document.createElement('tr');
                tdName.textContent = monsters[i].name;
                tdFart.textContent = (monsters[i].isFart) ? 'ok' : 'ko';
                tr.appendChild(tdName);
                tr.appendChild(tdFart);

                monsters[i].HTMLLine = tr;
                this.tbody.appendChild(tr);
            }

            return this;
        }

        createTitleOfTable() {
            // Items of titles
            const tr = document.createElement('tr'), thName = document.createElement('th'), thFart = document.createElement('th');
            thName.textContent = 'Name';
            thFart.textContent = 'Fart';

            // Attachment
            tr.appendChild(thName);
            tr.appendChild(thFart);
            this.titles.appendChild(tr);

            return this;
        }

        createEmptyTable() {
            this.table = document.createElement('table');

            this.titles = document.createElement('thead');
            this.tbody = document.createElement('tbody');

            this.table.appendChild(this.titles);
            this.table.appendChild(this.tbody);

            return this;
        }

        createButton() {
            // Button for display popup
            this.button = document.createElement("button");
            this.button.textContent = 'Fart';

            return this;
        }

        removeAllChild(element) {
            while (element.hasChildNodes()) {
                element.removeChild(element.firstChild);
            }

            return this;
        }
    };

    new Main(doc);
})(window.document);
