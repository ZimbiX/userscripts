// ==UserScript==
// @name         JIRA: Compact issue activity log
// @namespace    http://tampermonkey.net/
// @version      2025-10-10
// @description  try to take over the world!
// @author       Brendan Weibrecht
// @match        https://*.atlassian.net/browse/*
// @match        https://*.atlassian.net/jira/*
// @icon         https://jobready.atlassian.net/favicon.ico
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ZimbiX/userscripts/master/js/JIRA%3A%20Compact%20issue%20activity%20log.user.js
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
    };

    addCss(
        `
        /* Hide 'History' tags on history items */
        div[data-testid$=".history-item"] > div > div > div:has(span[data-testid="issue-history.common.ui.history-item.lozenge"]) {
            display: none;
        }

        /* Make everything in a history item show on one line */
        div[data-testid$=".history-item"] > div *,
        div[data-testid$=".history-item"] > div *:before {
            display: inline;
            margin-left: 0;
            margin-right: 0;
            margin-top: 0;
            margin-bottom: 0;
            color: #59636e;
        }

        /* Make history items' avatars small */
        div[data-testid$=".history-item"] > div:first-child {
            width: 20px;
            height: 20px;
        }

        /* Smaller inline avatars for issue assignee changes */
        div[data-testid$=".history-item"] img[data-vc="avatar-image"] {
            width: 20px;
            height: 20px;
            margin: -5px 0;
        }

        /* Add space after profile photo */
        div[data-testid$=".history-item"] > div[data-vc="profilecard-wrapper"] {
            margin-right: 1ex;
        }

        /* User name: Add a space after */
        div[data-testid$=".history-item"] div[data-testid="profilecard-next.ui.profilecard.profilecard-trigger"] {
            margin-right: 1ex !important;
        }

        /* User name: Make it black */
        div[data-testid$=".history-item"] div[data-testid="profilecard-next.ui.profilecard.profilecard-trigger"] * {
            color: #000 !important;
        }

        /* Add space between text pieces */
        div[data-testid$=".history-item"] > div > div > div {
            margin-right: 1ex;
        }

        /* Make activity black */
        div[data-testid$=".history-item"] > div:last-child > div:nth-child(2) * {
            color: #000 !important;
        }

        /* Reduce vertical space between history items */
        div[data-testid$=".history-item"] {
            margin-bottom: 12px;
        }

        /* Hide attachment history items */
        div[data-testid="issue-history.ui.history-items.history-item.attachment-history-item.history-item"] {
            display: none;
        }

        /* Prevent duplicate full datetimes appearing on hover */
        [hidden] {
            display: none !important;
        }
        `
    );

    const clickAllActivityButtonUntilItWorks = () => {
        console.log('clickAllActivityButtonUntilItWorks');
        const button = document.querySelector('button[data-testid="issue-activity-feed.ui.buttons.AllActivity"]');
        if (button) {
            if (button.ariaChecked === 'true') {
                console.log('AllActivity has been selected');
                return;
            }
            console.log('AllActivity has not yet been selected');
            button.click();
        }
        setTimeout(clickAllActivityButtonUntilItWorks, 100);
    }
    clickAllActivityButtonUntilItWorks();

    window.navigation.addEventListener("navigate", (event) => {
        console.log('Navigated!');
        clickAllActivityButtonUntilItWorks();
    });

    /* Hide description updated history items */
    const hideUselessActivityLogItems = () => {
        document.querySelectorAll('div[data-testid="issue-history.ui.history-items.generic-history-item.history-item"]').forEach((item) => {
            const x = item.querySelector(':scope > div:nth-child(2) > div:first-child');
            if (x.textContent.includes('updated the Description')) {
                item.style.display = 'none';
            }
        });
        setTimeout(hideUselessActivityLogItems, 100);
    }
    hideUselessActivityLogItems();
})();