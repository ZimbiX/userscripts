// ==UserScript==
// @name         ReadyTech JobReady Plus: Auto-login
// @namespace    http://tampermonkey.net/
// @version      2024-10-31
// @description  try to take over the world!
// @author       You
// @match        https://jhuizy.dev.plus.jobready.io/
// @match        https://jhuizy.dev.plus.jobready.io/user/signin
// @icon         https://jhuizy.dev.plus.jobready.io/favicon.ico
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ZimbiX/userscripts/master/js/ReadyTech%20JobReady%20Plus%3A%20Auto-login.user.js
// ==/UserScript==

(function() {
    'use strict';

    const passwordInput = document.querySelector('input[type="password"]');

    const autoLoginOnceFilled = () => {
        console.log(passwordInput.value);
        if (passwordInput.value != '') {
            passwordInput.form.submit();
            passwordInput.form.style.opacity = 0.4;
            passwordInput.form.querySelectorAll('input').forEach((e) => {
                e.disabled = true;
                e.style.cursor = 'wait';
            });
            document.body.style.cursor = 'wait';
        } else {
            setTimeout(autoLoginOnceFilled, 1);
        }
    };

    autoLoginOnceFilled();
})();
