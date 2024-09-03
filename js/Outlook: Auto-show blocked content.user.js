// ==UserScript==
// @name         Outlook: Auto-show blocked content
// @namespace    http://tampermonkey.net/
// @version      2024-08-23
// @description  try to take over the world!
// @author       You
// @match        https://outlook.office.com/mail/*
// @icon         https://res.cdn.office.net/owamail/20240809006.15/resources/images/favicons/mail-seen.ico
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ZimbiX/userscripts/master/js/Outlook%3A%20Auto-show%20blocked%20content.user.js
// ==/UserScript==

(function() {
    'use strict';

    const showBlockedContent = () => {
        if (!window.location.href.startsWith('https://outlook.office.com/mail/inbox/id/')) { return };
        const showBlockedContentButton = Array.from(document.querySelectorAll('.fui-MessageBarActions button')).find(btn => btn.textContent == 'Show blocked content');
        if (showBlockedContentButton) {
            showBlockedContentButton.click();
            console.log("Clicked 'Show blocked content'");
        };
    }

    const loopShowBlockedContent = () => {
        setTimeout(() => {
            showBlockedContent();
            loopShowBlockedContent();
        }, 1);
    }

    loopShowBlockedContent();
})();
