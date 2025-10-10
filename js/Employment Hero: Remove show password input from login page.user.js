// ==UserScript==
// @name         Employment Hero: Remove show password input from login page
// @namespace    http://tampermonkey.net/
// @version      2025-10-11
// @description  The checkbox is deceptive, given a login checkbox is normally for 'remember me'
// @author       You
// @match        https://secure.employmenthero.com/users/sign_in*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=employmenthero.com
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ZimbiX/userscripts/master/js/Employment%20Hero%3A%20Remove%20show%20password%20input%20from%20login%20page.user.js
// ==/UserScript==

(function() {
    'use strict';

    const run = (showPasswordFieldLabel) => {
        showPasswordFieldLabel.style.display = 'none';
        showPasswordFieldLabel.parentNode.style.justifyContent = 'center';
    };

    const runWhenReady = () => {
        const showPasswordFieldLabel = Array.from(document.querySelectorAll('div[data-test-id="password-input-container"] + div span')).filter(e => e.textContent === 'Show password')[0];
        if (showPasswordFieldLabel) {
            run(showPasswordFieldLabel);
        } else {
            setTimeout(runWhenReady, 5);
        }
    };

    runWhenReady();
})();
