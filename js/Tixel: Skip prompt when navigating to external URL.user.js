// ==UserScript==
// @name         Tixel: Skip prompt when navigating to external URL
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://tixel.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tixel.com
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ZimbiX/userscripts/master/js/Tixel%3A%20Skip%20prompt%20when%20navigating%20to%20external%20URL.user.js
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

    const attemptToClickButton = ({ buttonName, buttonSelector, timeoutMs, waitedMs = 0 } = {}) => {
        const button = document.querySelector(buttonSelector);
        if (button) {
            console.log(`${buttonName} button found; reassigning window.open() and clicking the button...`);
            window.open = (x) => { window.location = x };
            button.click();
        } else if (waitedMs < timeoutMs) {
            console.log(`${buttonName} button not yet found; trying again in 1ms`);
            setTimeout(() => {
                attemptToClickButton({
                    buttonName,
                    buttonSelector,
                    timeoutMs,
                    waitedMs: waitedMs + 1,
                })
            }, 1);
        } else {
            console.log(`${buttonName} button not found after ${waitedMs}ms - timed out`);
        }
    }

    onEvent('click', 'a[data-e2e="components/stack-rows/event/primary"]', () => {
        console.log('Find tickets button/row clicked'); // e.g. Oztix
        attemptToClickButton({
            buttonName: 'Continue',
            buttonSelector: 'button[data-e2e="components/modals/primary-link:button-continue"]',
            timeoutMs: 1000,
        });
    })

    // When we navigate the browser back, close the prompt
    window.addEventListener('pageshow', (event) => {
        console.log('pageshow event');
        if (event.persisted) {
            console.log('This page was restored from the bfcache (browser navigated back)');
            if (document.body.textContent.match('You are heading to another site')) {
                console.log('Detected external URL prompt is open');
                attemptToClickButton({
                    buttonName: 'Back',
                    buttonSelector: 'a[data-e2e="components/modals/primary-link:button-close"]',
                    timeoutMs: 50,
                });
            }
        }
    });
})();