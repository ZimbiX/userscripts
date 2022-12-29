// ==UserScript==
// @name         Google Cloud: Switch to GreenSync Google account in Console
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Brendan Weibrecht
// @match        https://console.cloud.google.com/*
// @icon         https://ssl.gstatic.com/pantheon/images/favicon/default.png
// @grant        none
// @run-at       document-start
// ==/UserScript==
'use strict';
const setUrlParam = ({url, name, value}) => {
    let urlObj = new URL(url);
    urlObj.searchParams.set(name, value);
    return urlObj.href;
}
const urlOrig = window.location.href;
if (urlOrig.match('authuser=')) {
    console.log('[Account Switcher] Already selected an account');
} else {
    const gsUrl = setUrlParam({url: window.location, name: 'authuser', value: '1'});
    console.log(`[Account Switcher] Need to switch account - redirecting to: "${gsUrl}"...`);
    window.location = gsUrl;
}