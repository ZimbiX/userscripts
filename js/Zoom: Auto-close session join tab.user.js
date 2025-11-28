// ==UserScript==
// @name         Zoom: Auto-close session join tab
// @namespace    http://tampermonkey.net/
// @version      2025-11-28
// @description  try to take over the world!
// @author       You
// @match        https://*.zoom.us/postattendee?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=zoom.us
// @grant        window.close
// @downloadURL  https://raw.githubusercontent.com/ZimbiX/userscripts/master/js/Zoom%3A%20Auto-close%20session%20join%20tab.user.js
// ==/UserScript==

(function() {
    'use strict';

    setTimeout(() => { window.close(); }, 10_000);
})();
