// ==UserScript==
// @name         Oztix: Select manual address entry to allow identity autofill with Bitwarden
// @namespace    http://tampermonkey.net/
// @version      2024-05-27
// @description  try to take over the world!
// @author       You
// @match        https://tickets.oztix.com.au/outlet/checkout/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=oztix.com.au
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ZimbiX/userscripts/master/js/Oztix%3A%20Select%20manual%20address%20entry%20to%20allow%20identity%20autofill%20with%20Bitwarden.user.js
// ==/UserScript==

(function() {
    'use strict';

    const manualAddressEntryLink = document.querySelector('a.address-link.manual');

    manualAddressEntryLink.click();
})();