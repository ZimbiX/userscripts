// ==UserScript==
// @name         JIRA: Don't underline issue keys in list of subtasks
// @namespace    http://tampermonkey.net/
// @version      2026-08-26
// @description  To be better able to visually distinguish between completed and non-completed tickets
// @author       Brendan Weibrecht
// @match        https://attainhealthtech.atlassian.net/browse/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=atlassian.net
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ZimbiX/userscripts/master/js/JIRA%3A%20Don%27t%20underline%20issue%20keys%20in%20list%20of%20subtasks.user.js
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
        tr[data-testid="native-issue-table.ui.issue-row"] div[data-testid="native-issue-table.common.ui.issue-cells.issue-key.action-container"] a {
            text-decoration: none !important;
        }
        /* Add completed appearance for done/closed tickets */
        tr[data-testid="native-issue-table.ui.issue-row"]:has(button[aria-label*="Done"  ]) div[data-testid="native-issue-table.common.ui.issue-cells.issue-key.action-container"] a,
        tr[data-testid="native-issue-table.ui.issue-row"]:has(button[aria-label*="Closed"]) div[data-testid="native-issue-table.common.ui.issue-cells.issue-key.action-container"] a {
            text-decoration: line-through !important;
            color: rgb(132 184 57);
        }
        `
    );
})();
