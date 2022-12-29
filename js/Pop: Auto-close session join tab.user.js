// ==UserScript==
// @name         Pop: Auto-close session join tab
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://pop.com/j/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=pop.com
// @grant        window.close
// ==/UserScript==

(function() {
    'use strict';

    setTimeout(() => { window.close(); }, 10000);
})();