// ==UserScript==
// @name         Tixel: Sort tickets by price in overlay
// @namespace    http://tampermonkey.net/
// @version      2026-02-07
// @description  try to take over the world!
// @author       Brendan Weibrecht
// @match        https://tixel.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tixel.com
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ZimbiX/userscripts/master/js/Tixel%3A%20Sort%20tickets%20by%20price%20in%20overlay.user.js
// ==/UserScript==

(function() {
    'use strict';

    const getPriceFromElement = element => parseFloat(element.innerText.match(/(?<=\$)\d+\.\d+/)[0]);

    const sortElementsByPrice = elements => {
        console.log('sortElementsByPrice');
        const elementsWrapper = elements[0].parentNode
        const elementsSortedByPrice = elements.toSorted((a, b) => (getPriceFromElement(a) - getPriceFromElement(b)));
        elementsSortedByPrice.forEach(item => elementsWrapper.appendChild(item));
    };

    const sortTickets = () => {
        const ticketlikeButtonElements = document.querySelectorAll('div[id^=headlessui-dialog-panel-] *:not(.zimbix-sorted) button:not(.zimbix-exclude)');
        const ticketElements = [...ticketlikeButtonElements].filter(button => {
            const isTicket = button.textContent.includes('$');
            if (!isTicket) { button.classList.add('zimbix-exclude'); }
            return isTicket;
        });
        if (ticketElements.length == 0) { return false; };
        const ticketElementsWrapper = ticketElements[0].parentNode;
        hideJoinWaitlistInOverlay(ticketElementsWrapper);
        sortElementsByPrice(ticketElements);
        ticketElementsWrapper.classList.add('zimbix-sorted');
        return true;
    };

    const hideJoinWaitlistInOverlay = (ticketElementsWrapper) => {
        console.log('Hiding join waitlist in overlay...');
        const joinWaitlistElement = Array.from(ticketElementsWrapper.children).at(-1);
        console.log(joinWaitlistElement);
        waitUntilElementInnerTextMatchesRegex(joinWaitlistElement, /Join the Waitlist/, () => {
            joinWaitlistElement.style.display = 'none';
        });
    };

    const waitUntilElementInnerTextMatchesRegex = (element, regex, successFn, attemptNumber = 1, maxAttempts = 1000) => {
        console.log(element.innerText);
        if (element.innerText.match(regex)) {
            successFn();
        } else if (attemptNumber < maxAttempts) {
            setTimeout(() => {
                waitUntilElementInnerTextMatchesRegex(element, regex, successFn, attemptNumber + 1, maxAttempts);
            }, 1);
        };
    };

    const loopSortTickets = () => {
        console.log('loopSortTickets');
        setTimeout(() => {
            sortTickets() || loopSortTickets();
        }, 10);
    };

    loopSortTickets();
})();