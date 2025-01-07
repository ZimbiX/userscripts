// ==UserScript==
// @name         Sonarr/Radarr: Link to media on Plex
// @namespace    http://tampermonkey.net/
// @version      2024-12-05
// @description  try to take over the world!
// @author       You
// @match        http://10.99.1.11:8989/series/*
// @match        http://10.99.1.11:7878/movie/*
// @icon         https://wiki.servarr.com/favicon.ico
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ZimbiX/userscripts/master/js/Sonarr-Radarr%3A%20Link%20to%20media%20on%20Plex.user.js
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

    const insertAfterLastElementOfDetailsRow = (elementToInsert) => {
        const lastElementOfDetailsRow = document.querySelector('div[class*="SeriesDetails-details-"] > div > *:last-child, div[class*="MovieDetails-details-"] > div > *:last-child');
        lastElementOfDetailsRow.after(elementToInsert);
    };

    const run = (mediaNameElement) => {
        addCss(
            `.zimbix-plex-link {
                width: 24px;
                height: 24px;
                vertical-align: text-top;
                border: 1px solid #555;
                border-radius: 4px;
            }
            .zimbix-plex-link-sonarr {
                margin-left: 15px;
            }
            .zimbix-plex-link-radarr {
                margin-left: 10px;
            }`
        );

        const mediaName = mediaNameElement.textContent;

        const plexLink = document.createElement('a');
        plexLink.href = 'https://app.plex.tv/desktop/#!/search?pivot=top&query=' + encodeURIComponent(mediaName);
        plexLink.title = 'Watch on Plex';

        const plexLogoImage = document.createElement('img');
        plexLogoImage.src = 'https://app.plex.tv/desktop/favicon.ico';
        plexLogoImage.classList.add('zimbix-plex-link');
        plexLink.appendChild(plexLogoImage);

        if (window.location.port == '8989') {
            plexLogoImage.classList.add('zimbix-plex-link-sonarr');
        } else {
            plexLogoImage.classList.add('zimbix-plex-link-radarr');
        }

        insertAfterLastElementOfDetailsRow(plexLink);
    };

    const runWhenReady = () => {
        const mediaNameElement = document.querySelector('div[class*="MovieDetails-title-"], div[class*="SeriesDetails-title-"]');
        if (mediaNameElement) {
            run(mediaNameElement);
        } else {
            setTimeout(runWhenReady, 10);
        }
    };

    runWhenReady();
})();
