// ==UserScript==
// @name         Gmail: Hide 'External' label on conversations
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Brendan Weibrecht
// @match        https://mail.google.com/mail/u/1/*
// @icon         https://www.google.com/a/cpanel/greensync.com.au/images/favicon.ico
// @grant        none
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
        "h2[data-thread-perm-id] + span > div[data-tooltip-contained] { display: none; } "
    )
})();
