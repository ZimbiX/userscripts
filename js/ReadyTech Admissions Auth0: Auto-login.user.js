// ==UserScript==
// @name         ReadyTech Admissions Auth0: Auto-login
// @namespace    http://tampermonkey.net/
// @version      2024-10-31
// @description  try to take over the world!
// @author       You
// @match        http://auth.admissions.localhost:3000/api/auth/signin
// @match        https://dev-rgbfs8ff62yv2r6n.us.auth0.com/u/organization?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=auth0.com
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ZimbiX/userscripts/master/js/ReadyTech%20Admissions%20Auth0%3A%20Auto-login.user.js
// ==/UserScript==

(function() {
    'use strict';

    if (window.location.pathname == '/api/auth/signin') {
        console.log('Continuing From Admissions app to Auth0 login...');

        const form = document.querySelector('form[action$="auth0"]')
        form.submit();

        const auth0Button = form.querySelector('button');
        auth0Button.disabled = true;
        auth0Button.style.opacity = 0.5;

        document.body.style.cursor = auth0Button.style.cursor = 'wait';

    } else {
        console.log('Entering organisation name in Auth0 and submitting...');

        const orgInput = document.querySelector('#organizationName');
        orgInput.value = 'jhuizy';
        orgInput.form.submit();

        const submitButton = orgInput.form.querySelector('button[type="submit"]');
        orgInput.disabled = true;
        submitButton.disabled = true;
        submitButton.style.opacity = 0.3;

        document.body.style.cursor = orgInput.style.cursor = 'wait';
    }
})();
