// ==UserScript==
// @name         Buildkite: Auto-login with GitHub
// @namespace    http://tampermonkey.net/
// @version      2024-09-16
// @description  Use GitHub login rather than password login - since ReadyTech EWP Buildkite org would then require GitHub login anyway, just with more pages in between.
// @author       You
// @match        https://buildkite.com/login
// @icon         https://www.google.com/s2/favicons?sz=64&domain=buildkite.com
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ZimbiX/userscripts/master/js/Buildkite%3A%20Auto-login%20with%20GitHub.user.js
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

    addCss(
        [
            "body, * {",
            "  cursor: wait !important",
            "}",

            "form {",
            "  opacity: 0.2 !important",
            "}",
        ].join(' ')
    )

    document.querySelector('form[action^="/user/authorize/github"]').submit();

    // GitHub login takes a little while, so disable the alternative to prevent thinking I need to use that
    document.querySelectorAll('form[action="/login"] input').forEach((input) => {
        input.disabled = true;
    });
})();
