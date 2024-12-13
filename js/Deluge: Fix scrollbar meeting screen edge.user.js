// ==UserScript==
// @name         Deluge: Fix scrollbar meeting screen edge
// @namespace    http://tampermonkey.net/
// @version      2024-12-13
// @description  try to take over the world!
// @author       You
// @match        http://10.99.1.11:8112/
// @icon         https://deluge-torrent.org/assets/deluge_icon.png
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ZimbiX/userscripts/master/js/Deluge%3A%20Fix%20scrollbar%20meeting%20screen%20edge.user.js
// ==/UserScript==

(function() {
    'use strict';

    const addCss = (cssCode) => {
        const noopTrustPolicy = trustedTypes.createPolicy("noopTrustPolicy", {
            createHTML: (string) => string
        })
        const styleElement = document.createElement("style")
        styleElement.type = "text/css"
        document.getElementsByTagName("head")[0].appendChild(styleElement)
        if (styleElement.styleSheet) {
            styleElement.styleSheet.cssText = cssCode
        } else {
            styleElement.innerHTML = noopTrustPolicy.createHTML(cssCode)
        }
    }

    addCss(
        "#torrentGrid .x-panel-body { border-right: 0px; }"
    )
})();