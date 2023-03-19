// ==UserScript==
// @name         Pop: Auto-close session join tab
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://pop.com/j/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=pop.com
// @grant        window.close
// @downloadURL  https://raw.githubusercontent.com/ZimbiX/userscripts/master/js/Pop%3A%20Auto-close%20session%20join%20tab.user.js
// ==/UserScript==

(function() {
    'use strict';

    setTimeout(() => { window.close(); }, 10000);
})();