// ==UserScript==
// @name         Pebble Appstore: Crisp screenshots
// @namespace    http://tampermonkey.net/
// @version      2026-06-09
// @description  Make screenshots for Pebble Time 2 nicer, displaying them at native resolution
// @author       Brendan Weibrecht
// @match        https://apps.repebble.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=repebble.com
// @grant        none
// @run-at       document-start
// @downloadURL  https://raw.githubusercontent.com/ZimbiX/userscripts/master/js/Pebble%20Appstore%3A%20Crisp%20screenshots.user.js
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


    addCss(`
        /* Undo the scaling of screenshots
           200 = width of image unscaled
           93 = width of image after original blurry scaling */
        .AppDetail-module__V0AE0G__appScreenshots {
            zoom: calc(200 / 93);
        }

        /* Remove specific integer width of screenshots to avoid amplifying rounding error */
        .AppDetail-module__V0AE0G__screenshotSlider img {
            width: 93px !important;
            height: auto !important;
            padding-top: 2px; /* Vertically center screenshots to compensate for the watch overlay image not having the right screen ratio */
        }

        /* Reduce how much of the watch band is shown now that the section is much bigger */
        .AppDetail-module__V0AE0G__sliderContainer {
            margin: -20px 0 !important;
        }
    `);
})();
