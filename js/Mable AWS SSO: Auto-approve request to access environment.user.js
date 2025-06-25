// ==UserScript==
// @name         Mable AWS SSO: Auto-approve request to access environment
// @namespace    http://tampermonkey.net/
// @version      2025-05-20
// @description  try to take over the world!
// @author       Brendan Weibrecht
// @match        https://mable.awsapps.com/start/
// @match        https://attainhealthtech.awsapps.com/start/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=mable.com.au
// @grant        window.close
// @downloadURL  https://raw.githubusercontent.com/ZimbiX/userscripts/master/js/Mable%20AWS%20SSO%3A%20Auto-approve%20request%20to%20access%20environment.user.js
// ==/UserScript==

(function() {
    'use strict';

    let clicks = [];

    const isPage1 = () => window.location.hash.match(new RegExp('#/device\\?user_code='));
    const headingTextOnPage1 = 'Authorization requested';
    const clickContinueOnPage1 = () => {
        console.log('clickContinueOnPage1');
        document.querySelector('button#cli_verification_btn').click();
    };

    const isPage2 = () => window.location.hash.match(new RegExp('#/\\?clientId=.+&clientType=.+'));
    const headingTextOnPage2 = 'Allow access to your data?';
    const clickContinueOnPage2AndClose = () => {
        console.log('clickContinueOnPage2AndClose');
        document.querySelector('button[data-testid="allow-access-button"]').click();
        setTimeout(window.close, 1000)
    };

    const isExpectedHeadingShown = (expectedHeading) => [...document.querySelectorAll('h1, h2')].map(el => el.textContent).some(heading => heading == expectedHeading);

    const runLoop = () => {
        if (isPage1()) {
            if (isExpectedHeadingShown(headingTextOnPage1) && !clicks.includes('page1')) {
                clickContinueOnPage1();
                clicks.push('page1');
            }
        } else if (isPage2()) {
            if (isExpectedHeadingShown(headingTextOnPage2) && !clicks.includes('page2')) {
                clickContinueOnPage2AndClose();
                clicks.push('page2');
            }
        }
        setTimeout(runLoop, 10);
    };

    runLoop();
})();
