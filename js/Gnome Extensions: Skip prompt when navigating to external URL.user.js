// ==UserScript==
// @name         Gnome Extensions: Skip prompt when navigating to external URL
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://extensions.gnome.org/away/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=gnome.org
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ZimbiX/userscripts/master/js/Gnome%20Extensions%3A%20Skip%20prompt%20when%20navigating%20to%20external%20URL.user.js
// ==/UserScript==

(function() {
    'use strict';

    const encodedExternalUrl = window.location.href.replace('https://extensions.gnome.org/away/', '')
    // It's double-encoded for some reason
    const decodedExternalUrl = decodeURIComponent(decodeURIComponent(encodedExternalUrl))
    window.location = decodedExternalUrl

    // Your code here...
})();