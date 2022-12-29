// ==UserScript==
// @name         YouTube: Redirect from shorts player to full video player
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.youtube.com/shorts/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const matches = window.location.href.match(new RegExp("https://www.youtube.com/shorts/([A-Za-z0-9_-]+)"))
    const videoId = matches[1]
    if (videoId) {
        window.location.href = `https://www.youtube.com/watch?v=${videoId}`
    }
})();