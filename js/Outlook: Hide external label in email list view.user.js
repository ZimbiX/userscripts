// ==UserScript==
// @name         Outlook: Hide external label in email list view
// @namespace    http://tampermonkey.net/
// @version      2024-09-19
// @description  try to take over the world!
// @author       You
// @match        https://outlook.office.com/mail/*
// @icon         https://res.cdn.office.net/owamail/20240809006.15/resources/images/favicons/mail-seen.ico
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ZimbiX/userscripts/master/js/Outlook%3A%20Hide%20external%20label%20in%20email%20list%20view.user.js
// ==/UserScript==

(function() {
    'use strict';

    const hideExternalLabels = () => {
        if (window.location.href.startsWith('https://outlook.office.com/mail/inbox/id/')) { return };
        document.querySelectorAll('#MailList div[aria-label="Select a conversation"] + span').forEach((label) => {
            if (label.textContent === 'External') {
                label.style.display = 'none';
            };
        });
    }

    const loophideExternalLabels = () => {
        setTimeout(() => {
            hideExternalLabels();
            loophideExternalLabels();
        }, 1);
    }

    loophideExternalLabels();
})();
