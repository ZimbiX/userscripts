// ==UserScript==
// @name         Google: SSO auto-login with company account
// @namespace    http://tampermonkey.net/
// @version      2025-07-27
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

    const redirectUriHost = () => {
        const redirectUri = (new URL(window.location)).searchParams.get('redirect_uri');
        if (redirectUri) {
            return (new URL(redirectUri)).host;
        } else {
            return '';
        }
    }

    const isAppUsedByCompany = () => (
        redirectUriHost().match(new RegExp("(\.1password\.com|^miro\.com|\.atlassian\.com|\.twilio\.com|\.lever\.co|^multitudes\.us\.auth0\.com)$")) ||
        document.referrer.match(new RegExp("(\.signin\.aws\.amazon\.com|\.signin\.aws|\.cultureamp\.com|miro\.com|\.datadoghq\.com|\.mable\.com\.au|\.databricks\.com)/$"))
    )

    console.log('redirect_uri:', redirectUriHost());
    console.log('document.referrer:', document.referrer);

    if (isAppUsedByCompany()) {
        console.log('Referrer matched; selecting company account');
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
