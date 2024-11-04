// ==UserScript==
// @name         Gmail: Make scrollbar rightmost by hiding padding element
// @namespace    http://tampermonkey.net/
// @version      2024-11-04
// @description  try to take over the world!
// @author       Brendan Weibrecht
// @match        https://mail.google.com/mail/u/0/
// @icon         https://www.google.com/a/cpanel/greensync.com.au/images/favicon.ico
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ZimbiX/userscripts/master/js/Gmail%3A%20Make%20scrollbar%20rightmost%20by%20hiding%20padding%20element.user.js
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

    // Hide the column element that's between the scrollbar and the right edge of the window
    addCss(
        "div[tabindex='0'] + div > div > div > div[role=navigation] + div + div { display: none; } "
    )
})();