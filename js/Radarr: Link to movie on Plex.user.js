// ==UserScript==
// @name         Radarr: Link to movie on Plex
// @namespace    http://tampermonkey.net/
// @version      2024-12-05
// @description  try to take over the world!
// @author       You
// @match        http://10.99.1.11:7878/movie/*
// @icon         https://radarr.video/img/favicon.ico
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ZimbiX/userscripts/master/js/Radarr%3A%20Link%20to%20movie%20on%20Plex.user.js
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
    };

    const run = (movieNameElement) => {
        addCss(
            `.zimbix-plex-link {
                width: 24px;
                height: 24px;
                vertical-align: text-top;
                border: 1px solid #555;
                border-radius: 4px;
                margin-left: 10px;
            }`
        );

        const movieName = movieNameElement.textContent;

        const plexLink = document.createElement('a');
        plexLink.href = 'https://app.plex.tv/desktop/#!/search?pivot=top&query=' + encodeURIComponent(movieName);
        plexLink.title = 'Watch on Plex';

        const plexLogoImage = document.createElement('img');
        plexLogoImage.src = 'https://app.plex.tv/desktop/favicon.ico';
        plexLogoImage.classList.add('zimbix-plex-link');
        plexLink.appendChild(plexLogoImage);

        const movieDetailsLinks = document.querySelector('span[class*="MovieDetails-links-"]');
        movieDetailsLinks.after(plexLink);
    };

    const runWhenReady = () => {
        const movieNameElement = document.querySelector('div[class*="MovieDetails-title-"]');
        if (movieNameElement) {
            run(movieNameElement);
        } else {
            setTimeout(runWhenReady, 10);
        }
    };

    runWhenReady();
})();
