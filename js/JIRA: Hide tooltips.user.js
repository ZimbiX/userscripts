// ==UserScript==
// @name         JIRA: Hide tooltips
// @namespace    http://tampermonkey.net/
// @version      2026-08-26
// @description  When hovering over the key in a list of subtasks, a tooltip appears on top of the subtask below; as you keep moving the cursor down, it remains in the way of that subtask. This script hides it.
// @author       Brendan Weibrecht
// @match        https://attainhealthtech.atlassian.net/browse/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=atlassian.net
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ZimbiX/userscripts/master/js/JIRA%3A%20Hide%20tooltips.user.js
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
        `
        div.atlaskit-portal div[role="tooltip"] {
            display: none;
        }
        `
    );
})();