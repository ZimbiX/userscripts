// ==UserScript==
// @name         Teams: Auto-close session join tab
// @namespace    http://tampermonkey.net/
// @version      2024-08-26
// @description  try to take over the world!
// @author       You
// @match        https://teams.microsoft.com/dl/launcher/launcher.html?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=teams.microsoft.com
// @grant        window.close
// @downloadURL  https://raw.githubusercontent.com/ZimbiX/userscripts/master/js/Teams%3A%20Auto-close%20session%20join%20tab.user.js
// ==/UserScript==

(function() {
    'use strict';

    setTimeout(() => { window.close(); }, 10_000);
})();