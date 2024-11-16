// ==UserScript==
// @name         Amber: Make graphs be stacked vertically
// @namespace    http://tampermonkey.net/
// @version      2024-11-16
// @description  try to take over the world!
// @author       You
// @match        https://app.amber.com.au/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=amber.com.au
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ZimbiX/userscripts/master/js/Amber%3A%20Make%20graphs%20be%20stacked%20vertically.user.js
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

    const run = () => {
        if (window.location.pathname == '/usage/') {
            addCss(
                [
                    "main > div:last-child > div {",
                    "  display: block !important;",
                    "}",
                ].join(' ')
            );
        }
    }

    window.navigation.addEventListener('navigate', () => {
        console.log('navigate event - to:', window.location.pathname);
        run();
    });
})();
