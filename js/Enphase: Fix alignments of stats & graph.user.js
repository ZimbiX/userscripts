// ==UserScript==
// @name         Enphase: Fix alignments of stats & graph
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://enlighten.enphaseenergy.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=enphaseenergy.com
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
        [
            // Fix horizontal alignment of energy stats section when hovering on the chart
            ".energy-stats__left, .energy-stats__right { width: 150px; }",
            ".energy-stats__left { justify-content: right; }",

            // Fix horizontal hover offset of chart bars
            ".browser .energy .energy-stats-and-graph-browser .energy-graph { padding-left: calc(3.4% + 10px); }",
        ].join(' ')
    )
})();