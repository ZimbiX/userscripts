// ==UserScript==
// @name         YouTube: Fix video control buttons screen edge alignment
// @namespace    http://tampermonkey.net/
// @version      2026-01-10
// @description  Only the fullscreen button for now
// @author       Brendan Weibrecht
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ZimbiX/userscripts/master/js/YouTube%3A%20Fix%20video%20control%20buttons%20screen%20edge%20alignment.user.js
// ==/UserScript==

(function() {
    'use strict';

    const addCss = (cssCode) => {
        const noopTrustPolicy = trustedTypes.createPolicy("noopTrustPolicy", {
            createHTML: (string) => string
        })
        const styleElement = document.createElement("style")
        styleElement.type = "text/css"
        document.getElementsByTagName("head")[0].appendChild(styleElement)
        if (styleElement.styleSheet) {
            styleElement.styleSheet.cssText = cssCode
        } else {
            styleElement.innerHTML = noopTrustPolicy.createHTML(cssCode)
        }
    }

    addCss(
        `
        :root {
            --fullscreen-button-original-height: 40px;
            --fullscreen-button-original-width: 48px;
            --screen-gap-bottom: 8px;
            --screen-gap-right: 16px;
        }

        /* Make fullscreen button meet the bottom and right edges of the screen */
        .ytp-delhi-modern .ytp-chrome-controls .ytp-right-controls .ytp-button.ytp-fullscreen-button {
            margin-bottom: calc(var(--screen-gap-bottom) * -1) !important;
            height: calc(var(--fullscreen-button-original-height) + var(--screen-gap-bottom)) !important;
            margin-right: calc(var(--screen-gap-right) * -1) !important;
            width: calc(var(--fullscreen-button-original-width) + var(--screen-gap-right)) !important;
        }

        /* Update fullscreen button's hover highlight position */
        .ytp-delhi-modern .ytp-chrome-controls .ytp-right-controls .ytp-button.ytp-fullscreen-button::before {
            top: calc(50% - calc(var(--screen-gap-bottom) / 2)) !important;
            left: calc(50% - calc(var(--screen-gap-right) / 2)) !important;
        }
        `
    );
})();
