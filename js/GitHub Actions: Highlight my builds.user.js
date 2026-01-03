// ==UserScript==
// @name         GitHub Actions: Highlight my builds
// @namespace    http://tampermonkey.net/
// @version      2026-01-03
// @description  try to take over the world!
// @author       You
// @match        https://github.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        none
// @run-at       document-start
// @downloadURL  https://raw.githubusercontent.com/ZimbiX/userscripts/master/js/GitHub%20Actions%3A%20Highlight%20my%20builds.user.js
// ==/UserScript==

(function() {
    'use strict';

    const githubUsername = document.querySelector('meta[name="user-login"]').content;

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
        `.Box-row:has(a[href="/${githubUsername}"]) {
          background-color: #fff0be;

          /* Fix top border of first build */
          border-top-left-radius: 0;
          border-top-right-radius: 0;
          border-top-color: var(--borderColor-muted);
        }
        `
    );
})();
