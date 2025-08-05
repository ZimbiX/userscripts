// ==UserScript==
// @name         JIRA board: Prevent card jiggle on scroll
// @namespace    http://tampermonkey.net/
// @version      2025-08-05
// @description  Jira removes cards from the DOM when they scroll out of view. The re-adding of the card and re-initialisation of its footer row causes a whopping five rounds of dimensions/position adjustment, which is visually jarring. Somehow I stumbled upon removing the footer's top margin as the solution.
// @author       Brendan Weibrecht
// @match        https://*.atlassian.net/jira/software/c/projects/*/boards/*
// @icon         https://jobready.atlassian.net/favicon.ico
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ZimbiX/userscripts/master/js/JIRA%20board%3A%20Prevent%20card%20jiggle%20on%20scroll.user.js
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
    };

    addCss(
        `div[data-testid="platform-card.ui.card.card-content.footer"] {
            margin-top: 0 !important;
        }`
    );
})();
