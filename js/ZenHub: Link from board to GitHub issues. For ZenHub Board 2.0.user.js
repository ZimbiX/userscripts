// ==UserScript==
// @name         ZenHub: Link from board to GitHub issues. For ZenHub Board 2.0
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  When opening issues from a ZenHub board, use GitHub's UI rather than ZenHub's - when clicking on the issue title. Like a normal link, it supports both left-click (open in current tab) and middle-click (open in new tab). To open an issue in ZenHub's UI, click on any non-title part of the card. To drag an issue, you'll need to drag from any non-title part of the card.
// @author       Brendan Weibrecht
// @match        https://app.zenhub.com/workspaces/*
// @icon         https://app.zenhub.com/dist/favicon/apple-touch-icon.png
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ZimbiX/userscripts/master/js/ZenHub%3A%20Link%20from%20board%20to%20GitHub%20issues.%20For%20ZenHub%20Board%202.0.user.js
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

    const getIssueUrlForAddingLinkToCard = (cardTitleElement) => {
        const headingElement = cardTitleElement.parentNode.children[0];
        if (!headingElement) { return };
        const [issueRepo, issueNumber] = Array(...headingElement.querySelectorAll('span > span[title]')).map(e => e.title.replace('#', ''));
        return `https://github.com/greensync/${issueRepo}/issues/${issueNumber}`;
    }

    const getIssueLinkUrlFromCard = (cardTitleElement) => {
        return cardTitleElement.closest('.github-link').href;
    }

    const navigateToIssuePageForCard = (cardTitleElement) => {
        window.location = getIssueLinkUrlFromCard(cardTitleElement);
    }

    const wrap = (toWrap, wrapper) => {
        wrapper = wrapper;
        toWrap.parentNode.appendChild(wrapper);
        return wrapper.appendChild(toWrap);
    };

    const stopEvent = (event) => {
        console.log(event.type);
        event.stopImmediatePropagation();
        event.stopPropagation();
        event.preventDefault();
    }

    const addTitleLink = (cardTitleElement) => {
        const link = document.createElement('a');
        link.className = 'github-link';
        link.href = getIssueUrlForAddingLinkToCard(cardTitleElement);
        link.onmousedown = stopEvent;
        link.onmouseup = stopEvent;
        wrap(cardTitleElement, link);
    }

    const addTitleLinkIfNeeded = (cardTitleElement) => {
        const existingLinkElement = cardTitleElement.parentNode.parentNode.querySelector('.github-link');
        existingLinkElement || addTitleLink(cardTitleElement);
    }

    const refreshGithubLinks = () => {
        // console.log('refreshGithubLinks');
        const cardIssueNumberElements =
              Array(
                  ...document.querySelectorAll(
                      '.ReactVirtualized__Grid__innerScrollContainer div[data-rbd-draggable-id] span[title^="#"]'
                  )
              ).filter(e => e.title.match(new RegExp('^#[0-9]+$')));
        const cardTitleElements = cardIssueNumberElements.map(e => e.parentElement.parentElement.parentElement.children[1]);
        cardTitleElements.forEach(addTitleLinkIfNeeded);
        setTimeout(refreshGithubLinks, 1000);
    }

    const eventIsPrimaryMouseClick = (event) => (event.type == 'click');

    const handleMouseClickEvent = (event) => {
        if (eventIsPrimaryMouseClick(event)) {
            navigateToIssuePageForCard(event.target)
            stopEvent(event);
        };
    }

    ['click', 'mousedown'].forEach((eventName) => {
        onEvent(eventName, '.github-link', handleMouseClickEvent);
    })

    refreshGithubLinks();
})();