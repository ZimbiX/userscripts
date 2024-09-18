// ==UserScript==
// @name         Buildkite: Auto-login with GitHub
// @namespace    http://tampermonkey.net/
// @version      2024-09-16
// @description  try to take over the world!
// @author       You
// @match        https://buildkite.com/login
// @icon         https://www.google.com/s2/favicons?sz=64&domain=buildkite.com
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ZimbiX/userscripts/master/js/Buildkite%3A%20Auto-login%20with%20GitHub.user.js
// ==/UserScript==

(function() {
    'use strict';

    // GitHub login takes a little while, so disable the alternative to prevent thinking I need to use that
    document.querySelectorAll('form[action="/login"] input').forEach((input) => {
        input.disabled = true;
    });

    document.querySelector('.btn--github').click();
})();