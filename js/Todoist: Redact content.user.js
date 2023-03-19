// ==UserScript==
// @name         Todoist: Redact content
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://todoist.com/app*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=todoist.com
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ZimbiX/userscripts/master/js/Todoist%3A%20Redact%20content.user.js
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

    //addCss("main#content .task_content, #projects_list .text { background: black; color: black; }")
    addCss("#projects_list .text, .simple_content { background: black; color: black; }")
})();
