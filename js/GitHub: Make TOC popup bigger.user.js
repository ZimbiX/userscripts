// ==UserScript==
// @name         GitHub: Make TOC popup bigger
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Makes it much easier to navigate a large table of contents in a Markdown document
// @author       Brendan Weibrecht
// @match        https://github.com/*
// @icon         https://github.githubassets.com/favicons/favicon.svg
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ZimbiX/userscripts/master/js/GitHub%3A%20Make%20TOC%20popup%20bigger.user.js
// ==/UserScript==

(function() {
    'use strict';

    // http://youmightnotneedjquery.com/#delegate
    const onEvent = (eventName, elementSelector, handler) => {
        addEventListener(eventName, function(e) {
            // loop parent nodes from the target to the delegation node
            for (var target = e.target; target && target != this; target = target.parentNode) {
                if (target.matches && target.matches(elementSelector)) {
                    handler.call(target, e);
                    break;
                }
            }
        }, true);
    };

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

    // Make the TOC just about as wide as the repo readme, and nicely fill the window height if it's longer than that
    addCss("readme-toc .js-sticky .SelectMenu-modal { width: 878px; max-height: calc(100vh - 80px) !important; }")

    // Increase the indent of TOC menu items to aid visual differentiation of heading levels
    document.querySelectorAll('readme-toc .js-sticky .SelectMenu-list a').forEach((item) => {
        const paddingLeft = getComputedStyle(item).paddingLeft
        item.style.paddingLeft = `calc(${paddingLeft} * 2)`
    })

    // On opening the TOC, scroll down to show the full TOC menu if necessary
    onEvent('click', 'readme-toc .js-sticky details', (e) => {
        const readme = document.querySelector('#readme')
        const isTocBannerAtTopOfWindow = readme.getBoundingClientRect().top < 0
        if (!isTocBannerAtTopOfWindow) {
            const readmeY = readme.getBoundingClientRect().top + window.scrollY
            // Unlike the repo readme, on doc pages, the banner jumps out of position, so we need to compensate
            const jumpingBanner = e.target.closest('.Box-header.js-sticky')
            const jumpingBannerHeight = jumpingBanner ? jumpingBanner.getBoundingClientRect().height : 0
            window.scroll({ top: readmeY - jumpingBannerHeight + 1 })
        }
    })
})();