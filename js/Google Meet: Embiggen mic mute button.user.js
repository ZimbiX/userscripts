// ==UserScript==
// @name         Google Meet: Embiggen mic mute button
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       Brendan Weibrecht
// @match        https://meet.google.com/*
// @icon         https://fonts.gstatic.com/s/i/productlogos/meet_2020q4/v1/web-512dp/logo_meet_2020q4_color_1x_web_512dp.png
// @grant        none
// @run-at       document-start
// @downloadURL  https://raw.githubusercontent.com/ZimbiX/userscripts/master/js/Google%20Meet%3A%20Embiggen%20mic%20mute%20button.user.js
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

    addCss(`
        button[aria-label$="(CTRL + D)"] {
          padding: 32px !important;
          margin-top: -12px !important;
        }

        button[aria-label$="(CTRL + D)"] svg {
          width: 28px !important;
          height: auto !important;
        }
    `)
})();