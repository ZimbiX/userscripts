// ==UserScript==
// @name         Nebula: Fix video control buttons screen edge alignment
// @namespace    http://tampermonkey.net/
// @version      2.1
// @description  Make it easier to click on the play/pause and fullscreen buttons - being able to just flick your cursor to the corners of the screen, like with YouTube's fullscreen button
// @author       You
// @match        https://nebula.app/videos/*
// @match        https://nebula.tv/videos/*
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

    addCss(
        [
            // Make video control buttons meet the left and right edges of the screen, by removing padding
            "#video-controls > #video-scrubber + div {",
            "  padding: 0 !important;",
            "}",

            // Restore the original position of the leftmost button while making the clickable area larger, by adding padding
            "#toggle-play-button {",
            "  box-sizing: content-box !important;",
            "  padding-left: 24px !important;",
            "}",

            // Restore the original position of the rightmost button while making the clickable area larger, by adding padding.
            // The padding goes inside the SVG so the icon highlight hover area is increased too
            "#fullscreen-mode-button {",
            "  width: calc(33px + 24px) !important;",
            "}",
            "#fullscreen-mode-button > svg {",
            "  width: calc(32px + 24px) !important;",
            "  padding-right: 24px !important;",
            "}",
        ].join(' ')
    )
})();
