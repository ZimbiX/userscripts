// ==UserScript==
// @name         Buildkite: Add app build & environments pipeline links on pipelines of GreenSync projects
// @namespace    http://tampermonkey.net/
// @version      0.2
// @author       Brendan Weibrecht
// @match        https://buildkite.com/gs/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=buildkite.com
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ZimbiX/userscripts/master/js/Buildkite%3A%20Add%20app%20build%20%26%20environments%20pipeline%20links%20on%20pipelines%20of%20GreenSync%20projects.user.js
// ==/UserScript==

(() => {
    'use strict';

    const org = 'gs';
    const urlMatch = window.location.href.match(new RegExp(`https://buildkite.com(/${org}/[^/?]+)`))
    if (!urlMatch) { return }
    const currentPath = urlMatch[1]

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

    const addLink = (text, url) => {
        const githubIconLink = document.querySelector(`div[data-testid="PipelineHeader"] a[href*="https://github.com/"] svg`).parentNode.parentNode
        const deploymentsLink = githubIconLink.cloneNode(true)
        deploymentsLink.href = url
        deploymentsLink.title = 'https://buildkite.com' + url
        deploymentsLink.textContent = text
        deploymentsLink.className += ' zimbix-alternate-pipeline-link'
        githubIconLink.parentNode.insertBefore(deploymentsLink, githubIconLink)
    }

    const checkIfUrlExists = async (url) => {
        console.log(url)
        const response = await fetch(url, { method: 'HEAD', credentials: 'include' })
        // return response.ok
        return (response.ok && !response.redirected)
    }

    const addLinkIfUrlExists = async (linkText, linkUrl) => {
        if (linkUrl == currentPath) { return }
        const urlExists = await checkIfUrlExists(linkUrl)
        if (urlExists) { addLink(linkText, linkUrl) }
    }

    const specialCases = {
        //'dex-core': 'dex-deployments',
        'dex-core': 'dex-environments',
        'dex-core-upgrades': 'dex-environments',
        'dex-environments': 'dex-core',

        'anm-api-environments': 'anm',
        'anm': 'anm-api-environments',

        'staff-http-proxy': 'staff-http-proxy/builds/latest',
    }

    const generateUrl = (find, replace) => {
        const pipelineName = currentPath.replace(new RegExp(`^/${org}/`), '').toLowerCase()
        const specialCase = specialCases[pipelineName]
        return specialCase ? `/${org}/` + specialCase : currentPath.replace(new RegExp(find), replace)
    }

    addCss(
        ".zimbix-alternate-pipeline-link {" +
        "  font-size: 1.4em;" +
        "  z-index: 1;" +
        "  text-decoration: none !important;" +
        "}" +
        ".zimbix-alternate-pipeline-link:hover {" +
        "  filter: brightness(1.2);" +
        "}"
    )

    if (currentPath.match(new RegExp('-(environments|deployments)$'))) {
        addLinkIfUrlExists('📦', generateUrl('-(environments|deployments)', ''))
    } else {
        new Set([
            generateUrl('$', '-environments'),
            generateUrl('$', '-deployments'),
        ]).forEach(url => addLinkIfUrlExists('🚀', url))
    }
})()
