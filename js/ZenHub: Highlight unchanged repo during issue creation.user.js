// ==UserScript==
// @name         ZenHub: Highlight unchanged repo during issue creation
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  It's easy to forget to change the default repo when creating an issue on ZenHub; so make it easier to see that you haven't by showing a red border around the repo field until you click on it
// @author       Brendan Weibrecht
// @match        https://app.zenhub.com/workspaces/*
// @grant        none
// @icon         https://app.zenhub.com/dist/favicon/apple-touch-icon.png
// @downloadURL  https://raw.githubusercontent.com/ZimbiX/userscripts/master/js/ZenHub%3A%20Highlight%20unchanged%20repo%20during%20issue%20creation.user.js
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
        button[aria-label="Create Issue in Repo"]:not(.zimbix-changed) {
          border: 2px solid red !important;
        }
    `)

    const handleRepoChange = (e) => {
        const button = e.target.closest('button[aria-label="Create Issue in Repo"]')
        button.classList.add('zimbix-changed');
    }

    onEvent('click', 'button[aria-label="Create Issue in Repo"]', handleRepoChange);
})();