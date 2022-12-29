// ==UserScript==
// @name         Buildkite: Expand logs sections automatically
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Brendan Weibrecht
// @match        https://buildkite.com/gs/*/builds/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=buildkite.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const expandLogsSections = () => {
        document.querySelectorAll('.fa-caret-right').forEach((e) => { e.click() })
        setTimeout(expandLogsSections, 100);
    }

    expandLogsSections();
})();