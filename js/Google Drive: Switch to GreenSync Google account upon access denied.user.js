// ==UserScript==
// @name         Google Drive: Switch to GreenSync Google account upon access denied
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Brendan Weibrecht
// @match        https://drive.google.com/*
// @match        https://docs.google.com/*
// @icon         https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png
// @grant        none
// ==/UserScript==
(() => {
    'use strict';
    const urlOrig = window.location.href;
    if (document.title == 'Google Drive - Access Denied') {
        if (!urlOrig.match('/u/1/')) {
            console.log('[Account Switcher] Switching...');
            const urlGS = urlOrig.replace(new RegExp('(https://(drive|docs).google.com/drive)(/u/[0-9])?/'), '$1/u/1/');
            window.location = urlGS;
        } else {
            console.log('[Account Switcher] Already switched');
        }
    } else {
        console.log('[Account Switcher] Did not detect access denied, so no switch required');
    }
})();