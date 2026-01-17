// ==UserScript==
// @name         DoorDash: Prevent opening saved restaurant links in new tabs
// @namespace    http://tampermonkey.net/
// @version      2026-01-17
// @description  try to take over the world!
// @author       You
// @match        https://www.doordash.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=doordash.com
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ZimbiX/userscripts/master/js/DoorDash%3A%20Prevent%20opening%20saved%20restaurant%20links%20in%20new%20tabs.user.js
// ==/UserScript==

(function() {
    'use strict';

    document.addEventListener('click', e => e.target.removeAttribute('target'));
})();
