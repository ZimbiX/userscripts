// ==UserScript==
// @name         GitHub: Make TOC popup bigger
// @namespace    http://tampermonkey.net/
// @version      1.2
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
        const styleElement = document.createElement("style");
        styleElement.type = "text/css";
        document.getElementsByTagName("head")[0].appendChild(styleElement);
        if (styleElement.styleSheet) {
            styleElement.styleSheet.cssText = cssCode;
        } else {
            styleElement.innerHTML = cssCode;
        }
    }

    const tocPopupSelector = "#__primerPortalRoot__ > div > div[class*=OverviewRepoFiles-module__ActionMenu_Overlay-]";

    // Make the TOC just about as wide as the repo readme, and nicely fill the window height if it's longer than that
    addCss(
        // When the absolute left position is calculated by GitHub's JS, it will take this updated width into account
        `${tocPopupSelector} {` +
        "  width: 878px;" +
        "}"
    )

    const readmeHeaderSelector = '.Layout-main div[itemtype="https://schema.org/abstract"]';

    // On opening the TOC
    onEvent('click', readmeHeaderSelector + ' button[aria-label=Outline]', (e) => {
        // Increase the indent of TOC menu items to aid visual differentiation of heading levels
        setTimeout(() => {
            document.querySelectorAll(`${tocPopupSelector} a span > div`).forEach((item) => {
                const paddingLeft = getComputedStyle(item).paddingLeft;
                item.style.paddingLeft = `calc(${paddingLeft} * 1.5)`;
            })
        }, 1);

        // Scroll down to show the full TOC menu if necessary
        const readmeHeader = document.querySelector(readmeHeaderSelector);
        const isTocBannerAtTopOfWindow = readmeHeader.getBoundingClientRect().top === 0;
        if (!isTocBannerAtTopOfWindow) {
            const readmeHeaderY = readmeHeader.getBoundingClientRect().top + window.scrollY;
            window.scroll({ top: readmeHeaderY });
        }
    })
})();