// ==UserScript==
// @name         Todoist: Fix the scrollbar not being clickable at the very edge of the screen
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://todoist.com/app*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=todoist.com
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ZimbiX/userscripts/master/js/Todoist%3A%20Fix%20the%20scrollbar%20not%20being%20clickable%20at%20the%20very%20edge%20of%20the%20screen.user.js
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

    addCss("main#content { margin-right: -2px; }")
})();