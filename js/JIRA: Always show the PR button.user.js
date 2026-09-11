// ==UserScript==
// @name         JIRA: Always show the PR button
// @namespace    http://tampermonkey.net/
// @version      2026-09-09
// @description  I use this button all the time - it'd be nice to know where to move the cursor to in advance of entering the Development box
// @author       Brendan Weibrecht
// @match        https://*.atlassian.net/browse/*
// @match        https://*.atlassian.net/jira/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=atlassian.net
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ZimbiX/userscripts/master/js/JIRA%3A%20Always%20show%20the%20PR%20button.user.js
// ==/UserScript==

(function() {
    'use strict';

    const addCss = (cssCode) => {
        const styleElement = document.createElement("style")
        styleElement.type = "text/css"
        document.getElementsByTagName("head")[0].appendChild(styleElement)
        if (styleElement.styleSheet) {
            styleElement.styleSheet.cssText = cssCode
        } else {
            styleElement.innerHTML = cssCode
        }
    }

    addCss(
        `span[data-testid="development-board-dev-info-icon.container"]:nth-child(5)
        div[data-testid="development-summary-common.ui.summary-item.relative-container"] > div {
          opacity: 1 !important;
        }
        `
    );

    // There is no button until first hover on the row. TODO: Finish
    /*const run = () => {
        console.log('run');
        const element = document.querySelector('div[data-testid="development-summary-common.ui.summary-item.link-formatted-button"]');

        if (!element) { setTimeout(run, 100); return };

        console.log('found button!');
        console.log(element);

        const hoverEvent = new MouseEvent('mouseenter', {
            view: window,
            bubbles: true,
            cancelable: true,
        });

        element.dispatchEvent(hoverEvent);
    }

    run();*/
})();