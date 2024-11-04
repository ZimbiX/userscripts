// ==UserScript==
// @name         Nebula: Fix video control buttons screen edge alignment
// @namespace    http://tampermonkey.net/
// @version      3.1
// @description  Make it easier to click on the play/pause and fullscreen buttons - being able to just flick your cursor to the corners of the screen, like with YouTube's fullscreen button
// @author       You
// @match        https://nebula.app/*
// @match        https://nebula.tv/*
// @icon         https://nebula.app/favicon.ico
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ZimbiX/userscripts/master/js/Nebula%3A%20Fix%20video%20control%20buttons%20screen%20edge%20alignment.user.js
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
            "#video-controls > div[aria-label=scrubber] + div {",
            "  padding: 0 !important;",
            "}",

            // Restore the original position of the leftmost button while making the clickable area larger, by adding padding
            "#toggle-play-button, #replay-button {",
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

            // Make the video controls hover animation activate at the bottom edge of the screen
            "#video-controls svg {",
            "  height: 100% !important;",
            "}",

            // Prevent the stupid curve overlays on the video corners from blocking corner clicks by bringing the controls in front
            "#video-player .video-player-controls-wrapper {",
            "  z-index: 3 !important;",
            "}",
        ].join(' ')
    )
})();
