// ==UserScript==
// @name         Google Meet: Switch to company account by default
// @namespace    http://tampermonkey.net/
// @version      2025-05-23
// @description  You can still use Google Meet's switch account UI to switch to your personal account if necessary
// @author       Brendan Weibrecht
// @match        https://meet.google.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=meet.google.com
// @grant        none
// @run-at       document-start
// @downloadURL  https://raw.githubusercontent.com/ZimbiX/userscripts/master/js/Google%20Meet%3A%20Switch%20to%20company%20account%20by%20default.user.js
// ==/UserScript==

(function() {
    'use strict';

    let url = new URL(window.location);
    if (!url.searchParams.has('authuser')) {
        url.searchParams.append('authuser', '1');
        window.location = url;
    }
})();
