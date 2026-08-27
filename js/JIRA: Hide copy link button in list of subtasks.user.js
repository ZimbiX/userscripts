// ==UserScript==
// @name         JIRA: Hide copy link button in list of subtasks
// @namespace    http://tampermonkey.net/
// @version      2026-08-26
// @description  When hovering over the key in a list of subtasks, a copy link button appears and displaces the columns to the right. This can result in a long title being wrapped, and so the list moving around underneath your cursor as you mouse over it, which I find disconcerting. This script stops that by hiding the button, since copying the link via right-click is easy.
// @author       Brendan Weibrecht
// @match        https://*.atlassian.net/browse/*
// @match        https://*.atlassian.net/jira/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=atlassian.net
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ZimbiX/userscripts/master/js/JIRA%3A%20Hide%20copy%20link%20button%20in%20list%20of%20subtasks.user.js
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
        div[data-testid="native-issue-table.common.ui.issue-cells.issue-key.action-container"] button {
            display: none;
        }
        /* Prevent extra spacing on hover from an empty div being shown */
        div[data-testid="native-issue-table.common.ui.issue-cells.issue-key.action-container"] {
            column-gap: 0;
        }
        `
    );
})();