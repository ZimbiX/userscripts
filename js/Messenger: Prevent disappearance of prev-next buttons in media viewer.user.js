// ==UserScript==
// @name         Messenger: Prevent disappearance of prev/next buttons in media viewer
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.messenger.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=messenger.com
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ZimbiX/userscripts/master/js/Messenger%3A%20Prevent%20disappearance%20of%20prev-next%20buttons%20in%20media%20viewer.user.js
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
        div[aria-label="Media viewer"] div:has(> div[aria-label="Previous photo"]) {
            visibility: visible;
            opacity: 1;
        }`
    )

    addCss(`
        div[aria-label="Media viewer"] div:has(> div[aria-label="Next photo"]) {
            visibility: visible;
            opacity: 1;
        }`
    )
})();