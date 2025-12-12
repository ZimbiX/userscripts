// ==UserScript==
// @name         JIRA board: Link card titles to issue
// @namespace    http://tampermonkey.net/
// @version      2025-12-12
// @description  When opening issues from a JIRA board, use the whole page - when clicking on the issue title. Like a normal link, it supports both left-click (open in current tab) and middle-click (open in new tab). To open an issue in a modal, click on any non-title part of the card. To drag an issue, you'll need to drag from any non-title part of the card.
// @author       Brendan Weibrecht
// @match        https://*.atlassian.net/jira/software/c/projects/*/boards/*
// @icon         https://jobready.atlassian.net/favicon.ico
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ZimbiX/userscripts/master/js/JIRA%20board%3A%20Link%20card%20titles%20to%20issue.user.js
// ==/UserScript==

(function() {
    'use strict';

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

    const getIssueUrl = (cardTitleElement) => {
        const cardButton = cardTitleElement.closest('div[draggable="true"]').children[0];
        if (!cardButton) { return };
        const issueId = cardButton.ariaLabel.split(' ')[0];
        return `https://${window.location.host}/browse/${issueId}`;
    }

    const getIssueLinkUrlFromCard = (cardTitleElement) => {
        return cardTitleElement.closest('.zimbix-issue-link').href;
    }

    const navigateToIssuePageForCard = (cardTitleElement) => {
        window.location = getIssueLinkUrlFromCard(cardTitleElement);
    }

    const wrap = (toWrap, wrapper) => {
        wrapper = wrapper;
        toWrap.parentNode.prepend(wrapper);
        return wrapper.prepend(toWrap);
    };

    const stopEvent = (event) => {
        console.log(event.type);
        event.stopImmediatePropagation();
        event.stopPropagation();
        event.preventDefault();
    }

    const addTitleLink = (cardTitleElement) => {
        const link = document.createElement('a');
        link.className = 'zimbix-issue-link';
        link.href = getIssueUrl(cardTitleElement);
        link.style = 'color: inherit';
        link.onmousedown = stopEvent;
        link.onmouseup = stopEvent;
        // Add a sibling node after to retain margin-bottom - avoids a style that sets margin-bottom to 0 for :last-child
        const emptyNode = document.createElement('div');
        link.appendChild(emptyNode);
        wrap(cardTitleElement, link);
    }

    const addTitleLinkIfNeeded = (cardTitleElement) => {
        const hasExistingLinkElement = cardTitleElement.parentNode.className == 'zimbix-issue-link';
        hasExistingLinkElement || addTitleLink(cardTitleElement);
    }

    const refreshIssueLinks = () => {
        //console.log('refreshIssueLinks');
        const cardTitleElements =
              Array(
                  ...document.querySelectorAll(
                      '#jira-frontend ' +
                      'div[data-test-id="software-board.board-area"] ' +
                      'div[data-component-selector="platform-card.ui.card.card-content.content-section"]:first-child ' +
                      'span[class*="summary"]'
                  )
              );
        cardTitleElements.forEach(e => addTitleLinkIfNeeded(e.closest('div[data-component-selector="platform-card.ui.card.card-content.content-section"]')));
        setTimeout(refreshIssueLinks, 10);
    }

    addCss(
        [
            // Adding the link wrapper element breaks the card title's edit button. But it's a silly feature anyway - so I'll just hide the button
            '.zimbix-issue-link span > span {',
            '  display: none !important',
            '}',

            /*
            // Don't truncate the issue title
            // TODO: Fix flash of untruncated card on scroll to top
            '#jira-frontend ',
            'div[data-test-id="software-board.board-area"] ',
            '* {',
            '  -webkit-line-clamp: unset !important;',
            '}',

            // Hide issue title tooltip, given it's redundant without truncation
            '.atlaskit-portal-container div[role="tooltip"] {',
            '  display: none !important;',
            '}',
            */
        ].join(' ')
    )

    const eventIsPrimaryMouseClick = (event) => (event.type == 'click');

    const handleMouseClickEvent = (event) => {
        if (eventIsPrimaryMouseClick(event)) {
            navigateToIssuePageForCard(event.target)
            stopEvent(event);
        };
    }

    ['click', 'mousedown'].forEach((eventName) => {
        onEvent(eventName, '.zimbix-issue-link', handleMouseClickEvent);
    })

    refreshIssueLinks();
})();