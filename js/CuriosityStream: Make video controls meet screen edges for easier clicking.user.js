// ==UserScript==
// @name         CuriosityStream: Make video controls meet screen edges for easier clicking
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://curiositystream.com/video/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=curiositystream.com
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ZimbiX/userscripts/master/js/CuriosityStream%3A%20Make%20video%20controls%20meet%20screen%20edges%20for%20easier%20clicking.user.js
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
            // Widen video controls to meet left & right screen edges
            ".vjs-control-bar > div > div > div + ul,",
            ".vjs-control-bar > div > div > div + ul + ul",
            "{ padding: 0 !important; }",

            // Remove slight bottom padding of video controls to meet bottom screen edge
            ".video-js .vjs-control-bar",
            "{ padding-bottom: 0 !important; }",

            // Increase height of left video controls to meet bottom screen edge
            ".vjs-control-bar > div > div > ul:last-child > li > button",
            "{ height: 56px !important; }",
        ].join(' ')
    )
})();