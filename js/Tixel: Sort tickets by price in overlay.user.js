// ==UserScript==
// @name         Tixel: Sort tickets by price in overlay
// @namespace    http://tampermonkey.net/
// @version      2024-08-08
// @description  try to take over the world!
// @author       You
// @match        https://tixel.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tixel.com
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ZimbiX/userscripts/master/js/Tixel%3A%20Sort%20tickets%20by%20price%20in%20overlay.user.js
// ==/UserScript==

(function() {
    'use strict';

    const sortTickets = () => {
        const ticketElements = document.querySelectorAll('div[id^=headlessui-dialog-panel-] .overflow-y-scroll:not(.zimbix-sorted) > button');
        if (ticketElements.length == 0) { return };
        const ticketElementsWrapper = ticketElements[0].parentNode;
        hideJoinWaitlistInOverlay(ticketElementsWrapper);
        console.log('Sorting tickets by price...');
        const getPrice = element => parseFloat(element.innerText.match(/(?<=\$)\d+\.\d+/)[0]);
        const ticketElementsSortedByPrice = Array.from(ticketElements).toSorted((a, b) => (getPrice(a) - getPrice(b)));
        ticketElementsSortedByPrice.forEach(item => ticketElementsWrapper.appendChild(item));
        ticketElementsWrapper.classList.add('zimbix-sorted');
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
        setTimeout(() => {
            sortTickets();
            loopSortTickets();
        }, 1);
    };

    loopSortTickets();
})();