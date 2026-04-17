// ==UserScript==
// @name         GitHub: Make issue links navigate rather than opening a modal
// @namespace    http://tampermonkey.net/
// @version      2026-04-18
// @description  See https://github.com/orgs/community/discussions/192665
// @author       Brendan Weibrecht
// @match        https://github.com/*
// @icon         https://github.githubassets.com/favicons/favicon.svg
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ZimbiX/userscripts/master/js/GitHub%3A%20Make%20issue%20links%20navigate%20rather%20than%20opening%20a%20modal.user.js
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

    onEvent('click', 'a.issue-link', event => {
        console.log(event);
        window.Turbo.visit(event.target.href);
        event.stopPropagation();
    });
})();
