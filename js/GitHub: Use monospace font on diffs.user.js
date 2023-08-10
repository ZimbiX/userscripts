// ==UserScript==
// @name         GitHub: Use monospace font on diffs
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://github.com/*
// @icon         https://github.githubassets.com/favicons/favicon.svg
// @grant        none
// @run-at       document-start
// @downloadURL  https://raw.githubusercontent.com/ZimbiX/userscripts/master/js/GitHub%3A%20Use%20monospace%20font%20on%20diffs.user.js
// ==/UserScript==

(function() {
    'use strict';

    const addCss = (cssCode) => {
        const styleElement = document.createElement('style')
        styleElement.id = 'zimbix-monospace-css'
        styleElement.type = 'text/css'
        const headElement = document.getElementsByTagName('head')[0]
        if (!headElement) {
            console.log('[ZimbiX monospace CSS] No head element')
            return
        }
        headElement.appendChild(styleElement)
        if (styleElement.styleSheet) {
            styleElement.styleSheet.cssText = cssCode
        } else {
            styleElement.innerHTML = cssCode
        }
    }

    const myCss = `
        pre, code, .blob-code-inner, .text-mono,
        #read-only-cursor-text-area, #highlighted-line-menu-positioner, .react-code-text {
            font-family: Liberation Mono, monospace !important;
        }
    `

    const rerunDelayMs = 1;

    const addMyCss = (ms) => {
        if (ms >= 2000) { return }
        if (!document.getElementById('zimbix-monospace-css')) {
            console.log(`[ZimbiX monospace CSS] Adding CSS at ${ms}ms`)
            addCss(myCss)
        }
        setTimeout(() => addMyCss(ms + rerunDelayMs), rerunDelayMs);
    }

    addMyCss(0)
})();