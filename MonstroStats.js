// ==UserScript==
// @name       Stats
// @namespace  croqueScript
// @version    0.2
// @description  script for all monsters fart in croquemonster
// @include http://www.croquemonster.com/monster
// @include http://www.croquemonster.com/agency/ampe
// ==/UserScript==
(function() {
    var Monster = function(){
        this.create();
    };
    Monster.prototype = {
        create : function() {
            //attributes for contract
            this.sadism = 0;
            this.ugliness = 0;
            this.power = 0;
            this.greediness = 0;
            //others attributes
            this.control = 0;
            this.fight = 0;
            this.endurance = 0;
            this.bounty = 0;
        },
        sumPassive : function() {
            return (this.sadism + this.ugliness + this.power + this.greediness);
        },
        sumActive : function() {
            return (this.control + this.fight + this.endurance);
        },
        fillFromHTMLTable : function(HTMLTable) {
            var passiveCaracs = HTMLTable.querySelector('.monsterCar1 .caracs'),
                activeCaracs = HTMLTable.querySelector('.monsterCar2 .caracs');

            this.sadism = this.getHTMLCarac(passiveCaracs, 'sadism');
            this.ugliness = this.getHTMLCarac(passiveCaracs, 'ugliness');
            this.power = this.getHTMLCarac(passiveCaracs, 'power');
            this.greediness = this.getHTMLCarac(passiveCaracs, 'greediness');

            this.control = this.getHTMLCarac(activeCaracs, 'control');
            this.fight = this.getHTMLCarac(activeCaracs, 'fight');
            this.endurance = this.getHTMLCarac(activeCaracs, 'endurance');
            this.bounty = this.getHTMLCarac(activeCaracs, 'bounty'); //It's optionnal for calcul sum
        },
        getHTMLCarac : function(HTMLElementParent, classCarac) {
            return Number(HTMLElementParent.querySelector(['.', classCarac].join('')).lastChild.nodeValue);
        },
        toJSON : function() {
            var json = ['{'], i;
            for(i in this) {
                json.push([i, ':', this[i], ','].join(''));
            }
            json['}'];
            return json.join('');
        }
    };


    var monsters = window.document.querySelectorAll('.monsterBox');

    for(var i in monsters) {
        if(monsters[i].nodeType != 1) {
            continue;
        }
        //Create and init Monster
        var m = new Monster();
        m.fillFromHTMLTable(monsters[i].querySelector('.monsterDesc'));

        //Get h3 element with monster's name - get sum of passives and actives caracs of monteer
        var  title = monsters[i].querySelector('h3'), sp = m.sumPassive(), sa = m.sumActive();

        title.appendChild(window.document.createTextNode(sp + '-' + sa));
    }
})();
