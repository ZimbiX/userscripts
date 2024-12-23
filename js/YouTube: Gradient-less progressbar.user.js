// ==UserScript==
// @name         YouTube: Gradient-less progressbar
// @namespace    http://tampermonkey.net/
// @version      2024-12-24
// @description  try to take over the world!
// @author       You
// @match        https://www.youtube.com/watch?v=8Tpq-af78Kk
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ZimbiX/userscripts/master/js/YouTube%3A%20Gradient-less%20progressbar.user.js
// ==/UserScript==

// TODO: Might need to use some from: https://pastebin.com/raw/hEPXQ5Za

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
        ".ytp-play-progress { background: #f03 !important; }"
    );
})();
