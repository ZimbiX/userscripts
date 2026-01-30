// ==UserScript==
// @name         Google: SSO auto-login with company account
// @namespace    http://tampermonkey.net/
// @version      2026-01-30
// @description  Requires your company account to be the second option (id 1)
// @author       You
// @match        https://accounts.google.com/v3/signin/accountchooser?*
// @match        https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?*
// @match        https://accounts.google.com/o/oauth2/v2/auth?*
// @match        https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?*
// @match        https://accounts.google.com/o/oauth2/auth?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ZimbiX/userscripts/master/js/Google%3A%20SSO%20auto-login%20with%20company%20account.user.js
// ==/UserScript==

(function() {
    'use strict';

    const selectCompanyAccount = () => {
        const accountButtons = document.querySelectorAll('*[data-identifier*="@"]');
        console.log(accountButtons);
        const companyAccountButton = accountButtons[1];
        console.log(companyAccountButton);
        console.log('Clicking company account');
        companyAccountButton.click();
    }

    const hostnameRegexesOfAppsUsedByCompany = {
        '1Password':  "1password\.com",
        Miro:         "miro\.com",
        Atlassian:    "atlassian\.com",
        Twilio:       "twilio\.com",
        Lever:        "lever\.co",
        Multitudes:   "multitudes\.us\.auth0\.com",
        AWS:          "(signin\.aws\.amazon\.com|signin\.aws)",
        CultureAmp:   "cultureamp\.com",
        Datadog:      "datadoghq\.com",
        Mable:        "mable\.com\.au",
        Databricks:   "databricks\.com",
    };

    const redirectUrl = (new URL(window.location)).searchParams.get('redirect_uri');

    const getHostname = (url) => (url ? (new URL(url).host) : '');

    const appHostname = getHostname(redirectUrl || document.referrer);

    console.log('redirect_uri:', redirectUrl);
    console.log('document.referrer:', document.referrer);
    console.log('=> appHostname:', appHostname);

    const appIsUsedByCompany = Object.values(hostnameRegexesOfAppsUsedByCompany).some(regex => appHostname.match(new RegExp(`(^|\.)${regex}\$`)));

    if (appIsUsedByCompany) {
        console.log('Referrer/redirect URL matched; selecting company account');
        if (window.location.pathname.match(new RegExp("^/o/oauth2"))) {
            // On /o/oauth2, clicking the button straight away doesn't do anything
            setTimeout(selectCompanyAccount, 100);
        } else {
            selectCompanyAccount();
        };
    } else {
        console.log('Referrer did not match; not selecting company account');
    }
})();
