// ==UserScript==
// @name         GitHub Actions: Add links to filter by branch and actor
// @namespace    http://tampermonkey.net/
// @version      2026-01-03
// @description  try to take over the world!
// @author       You
// @match        https://github.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        none
// @run-at       document-start
// @downloadURL  https://raw.githubusercontent.com/ZimbiX/userscripts/master/js/GitHub%20Actions%3A%20Add%20links%20to%20filter%20by%20branch%20and%20actor.user.js
// ==/UserScript==

(function() {
    'use strict';

    const matchUrlRegex = new RegExp('^https://github.com/[^/]+/[^/]+/actions\\b');

    const githubUsername = document.querySelector('meta[name="user-login"]').content;

    const addCss = (cssCode) => {
        const styleElement = document.createElement("style")
        styleElement.type = "text/css"
        document.getElementsByTagName("head")[0].appendChild(styleElement)
        if (styleElement.styleSheet) {
            styleElement.styleSheet.cssText = cssCode
        } else {
            styleElement.innerHTML = cssCode
        }
    }

    const urlWithQueryKeyReplaced = (key, value) => {
        const filterUrlSearchParams = new URLSearchParams(window.location.search);
        const query = filterUrlSearchParams.get('query') || '';
        const newQuery = (query.replace(new RegExp(`\\b${key}:[^ ]+`), '') + ` ${key}:${value}`).replace(/^ /, '').replace(/ +/, ' ');
        filterUrlSearchParams.set('query', newQuery);
        filterUrlSearchParams.delete('page');
        return window.location.pathname + '?' + filterUrlSearchParams.toString();
    }

    const addBranchFilterLink = (branchNameLink) => {
        const branchName = branchNameLink.href.replace(new RegExp('https://github.com/[^/]+/[^/]+/tree/refs/heads/'), '');
        const filterUrl = urlWithQueryKeyReplaced('branch', branchName);

        const link = document.createElement('a');
        link.href = filterUrl;
        link.title = 'Filter to branch';
        link.textContent = '🎯';
        link.className = 'zimbix-actions-branch-filter-link';
        branchNameLink.parentNode.appendChild(link);
    }

    const addActorFilterLink = (actorNameLink) => {
        const actorName = actorNameLink.href.split('/').at(-1);
        const filterUrl = urlWithQueryKeyReplaced('actor', actorName);

        const link = document.createElement('a');
        link.href = filterUrl;
        link.title = 'Filter to actor';
        link.textContent = '🎯';
        link.className = 'zimbix-actions-actor-filter-link';
        actorNameLink.parentNode.appendChild(link);
    }

    addCss(
        `.zimbix-actions-branch-filter-link, .zimbix-actions-actor-filter-link {
          font-size: 20px;
          line-height: 0;
          padding: 2px 3px 6px 5px;
          margin-left: -3px;
          vertical-align: inherit;
          text-decoration: none;
        }
        .zimbix-actions-branch-filter-link:hover, .zimbix-actions-actor-filter-link:hover {
          filter: brightness(1.2);
        }`
    );

    const log = (msg) => console.log(`[Add links to filter by branch and actor] ${msg}`);

    const waitForBuildList = ({ timeoutMs, waitedMs = 0 } = {}) => {
        if (document.querySelector('.zimbix-actions-branch-filter-link')) {
            log(`Has already added branch filter links; cancelling`);
            return
        }
        const branchNameLinks = document.querySelectorAll('.branch-name');
        if (branchNameLinks.length != 0) {
            log(`Builds found; adding filter links for branches and actors...`);
            branchNameLinks.forEach(addBranchFilterLink);
            const actorNameLinks = document.querySelectorAll('a[data-hovercard-type="user"]');
            actorNameLinks.forEach(addActorFilterLink);
        } else if (waitedMs < timeoutMs) {
            log(`Builds not yet found; trying again in 1ms`);
            setTimeout(() => waitForBuildList({ timeoutMs, waitedMs: waitedMs + 1 }), 1);
        } else {
            log(`Builds not found - timed out`);
        }
    }

    const run = () => {
        if (window.location.href.match(matchUrlRegex)) {
            log(`Starting; waiting up to 1000ms for builds...`);
            waitForBuildList({ timeoutMs: 1000 });
        }
    }

    window.navigation.addEventListener('navigate', (e) => {
        console.log('navigate event', e, window.location);
        run();
        setTimeout(run, 20);
    });

    run();
})();
