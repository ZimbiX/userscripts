// ==UserScript==
// @name         ZenHub: Redirect from issue to GitHub issue
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       Brendan Weibrecht
// @match        https://app.zenhub.com/workspaces/*/issues/*
// @grant        none
// @run-at       document-start
// @icon         https://app.zenhub.com/dist/favicon/apple-touch-icon.png
// @downloadURL  https://raw.githubusercontent.com/ZimbiX/userscripts/master/js/ZenHub%3A%20Redirect%20from%20issue%20to%20GitHub%20issue.user.js
// ==/UserScript==

(function() {
    'use strict';

    const matches = window.location.href.match(new RegExp(".*/issues/gh/(?<org>[^/]+)/(?<repo>[^/]+)/(?<issue>[0-9]+)")).groups
    window.location = `https://github.com/${matches.org}/${matches.repo}/issues/${matches.issue}`
})();
