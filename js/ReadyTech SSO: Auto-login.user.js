// ==UserScript==
// @name         ReadyTech SSO: Auto-login
// @namespace    http://tampermonkey.net/
// @version      2024-08-30
// @description  try to take over the world!
// @author       You
// @match        https://readytech-prod.au.auth0.com/u/login/identifier?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=readytech.com.au
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ZimbiX/userscripts/master/js/ReadyTech%20SSO%3A%20Auto-login.user.js
// ==/UserScript==

(function() {
    'use strict';

    const input = document.querySelector('input[name="username"]');
    input.focus();
    input.value = 'brendan.weibrecht@readytech.io';
    input.form.submit();
})();
