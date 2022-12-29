// ==UserScript==
// @name         Nebula: Fix fullscreen exit button edge alignment
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://nebula.app/videos/*
// @icon         https://nebula.app/favicon.ico
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

    addCss(".vjs-control-bar { padding: 0 !important; }")
})();
