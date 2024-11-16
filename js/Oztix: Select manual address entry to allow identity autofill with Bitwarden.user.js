// ==UserScript==
// @name         Oztix: Select manual address entry to allow identity autofill with Bitwarden
// @namespace    http://tampermonkey.net/
// @version      2024-11-16
// @description  try to take over the world!
// @author       You
// @match        https://*.oztix.com.au/outlet/checkout/*
// @match        https://tickets-gen.goodthingsfestival.com.au/outlet/checkout/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=oztix.com.au
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ZimbiX/userscripts/master/js/Oztix%3A%20Select%20manual%20address%20entry%20to%20allow%20identity%20autofill%20with%20Bitwarden.user.js
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

    const manualAddressEntryLink = document.querySelector('a.address-link.manual');

    manualAddressEntryLink.click();

    const suburbInputSelector = 'input[name=address2]';
    const getSuburbInput = () => document.querySelector(suburbInputSelector);

    const saveSuburb = (suburb) => {
        localStorage.setItem("suburb", getSuburbInput().value);
    }

    const loadSuburb = () => {
        const suburb = localStorage.getItem("suburb");
        const suburbInput = getSuburbInput();
        suburbInput.value = suburb;
        // Trigger the page to save the suburb using its own mechanism, so it is not cleared when the state input is changed
        suburbInput.dispatchEvent(new Event('input'));
    }

    setTimeout(loadSuburb, 1);

    onEvent('change', suburbInputSelector, (e) => {
        saveSuburb();
    });
})();
