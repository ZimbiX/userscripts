// ==UserScript==
// @name         USE Together: Auto-close session host/join tab
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Automatically closes the tab that's opened when clicking on a USE Together session host/join link - once the USE Together app has had enough time to open, or not closing if you've proceeded to join the session in the browser (within 10 seconds)
// @author       Brendan Weibrecht
// @match        https://web.use-together.com/join/app?*
// @match        https://web.use-together.com/launch?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=use-together.com
// @grant        window.close
// @downloadURL  https://raw.githubusercontent.com/ZimbiX/userscripts/master/js/USE%20Together%3A%20Auto-close%20session%20host-join%20tab.user.js
// ==/UserScript==

(() => {
    'use strict';

    if (window.location.search.match(/user=/)) {
        console.log('USE Together web session detected - not auto-closing');
    } else {
        console.log('USE Together web session not detected - auto-closing shortly');
        setTimeout(() => { window.close(); }, 10000);
    }
})();
