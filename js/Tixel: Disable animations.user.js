// ==UserScript==
// @name         Tixel: Disable animations
// @namespace    http://tampermonkey.net/
// @version      2024-08-08
// @description  try to take over the world!
// @author       You
// @match        https://tixel.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tixel.com
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ZimbiX/userscripts/master/js/Tixel%3A%20Disable%20animations.user.js
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
        ".duration-500 {" +
        "  transition-duration: 0ms !important;" +
        "}"
    )
})();
