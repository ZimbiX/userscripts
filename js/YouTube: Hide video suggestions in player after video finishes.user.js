// ==UserScript==
// @name         YouTube: Hide video suggestions in player after video finishes
// @namespace    http://tampermonkey.net/
// @version      2025-11-28
// @description  The Unhook extension needs an update; I'll use this in the meantime
// @author       You
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ZimbiX/userscripts/master/js/YouTube%3A%20Hide%20video%20suggestions%20in%20player%20after%20video%20finishes.user.js
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

    addCss('.ytp-fullscreen-grid-stills-container { display: none !important; }');
})();
