// ==UserScript==
// @name         Buildkite: Add pipelines links for GS filters
// @namespace    http://tampermonkey.net/
// @version      0.1
// @author       Brendan Weibrecht
// @match        https://buildkite.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=buildkite.com
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ZimbiX/userscripts/master/js/Buildkite%3A%20Add%20pipelines%20links%20for%20GS%20filters.user.js
// ==/UserScript==

(function() {
    'use strict';

    document.querySelectorAll('#nav-container a[href="/gs"]').forEach(pipelinesLink => {
        const dexLink = pipelinesLink.cloneNode(true);
        dexLink.href = '/gs?filter=dex';
        dexLink.textContent = 'deX Pipelines';
        pipelinesLink.parentNode.insertBefore(dexLink, pipelinesLink);
    });

    document.querySelectorAll('#nav-container a[href="/gs"]').forEach(pipelinesLink => {
        const dexLink = pipelinesLink.cloneNode(true);
        dexLink.href = '/gs?filter=dex-registration';
        dexLink.textContent = 'deX Registration Pipelines';
        pipelinesLink.parentNode.insertBefore(dexLink, pipelinesLink);
    });
})();