// ==UserScript==
// @name         Bank of Melbourne: Fix Bitwarden autofill
// @namespace    http://tampermonkey.net/
// @version      1.0.2
// @description  See my blog post: https://medium.com/@ZimbiX/bank-of-melbourne-st-george-ce9079adc017
// @author       Brendan Weibrecht
// @match        https://ibanking.bankofmelbourne.com.au/ibank/loginPage.action
// @match        https://ibanking.bankofmelbourne.com.au/ibank/logonActionSimple.action
// @match        https://ibanking.stgeorge.com.au/ibank/loginPage.action
// @match        https://ibanking.stgeorge.com.au/ibank/logonActionSimple.action
// @match        https://ibanking.banksa.com.au/ibank/loginPage.action
// @match        https://ibanking.banksa.com.au/ibank/logonActionSimple.action
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bankofmelbourne.com.au
// @downloadURL  https://raw.githubusercontent.com/ZimbiX/userscripts/master/bank-of-melbourne_fix-bitwarden-autofill.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Makes debugging easier
    const changePasswordInputsTypeToText = () => {
        const securityNumberElement = document.getElementById('securityNumber')
        const passwordElement = document.getElementById('internet-password')
        console.log(securityNumberElement)
        console.log(passwordElement)
        securityNumberElement.setAttribute('type', 'text')
        passwordElement.setAttribute('type', 'text')
    }

    // When remember me is used, a redacted customer number is prefilled and the security number field is hidden.
    // When Bitwarden autofills the customer number, the security number field gets revealed, but too late for Bitwarden to notice and fill it.
    // I could just autofill again, but it's easier to prevent remember me.
    const disableRememberMe = () => {
        document.getElementById('rememberMeFull').disabled = true
    }

    const sitRep = (field) => {
        console.log(`value: ${field.value}`)
        console.log(`hasValue: ${field.getAttribute('hasValue')}`)
    }

    // The website primarily listens for the focusout event to then perform obfuscation.
    // This does get triggered by Bitwarden autofill, so the values do get obfuscated, but they don't stay that way!
    // Bitwarden must be also then using the `value=` setter, which does not trigger any events, and clobbers the obfuscated value.
    // To work around this, I record the obfuscated value, and restore it a moment later.
    const wrapObfuscationToRestoreObfuscatedValueAMomentLater = () => {
        const fnObfuscateInputOrig = window.fnObfuscateInput
        window.fnObfuscateInput = (field) => {
            console.log(`fnObfuscateInput running for: ${field.id}`)

            console.log('Before obfuscation:')
            sitRep(field)
            fnObfuscateInputOrig(field)

            console.log('After obfuscation:')
            sitRep(field)
            const obfuscatedValue = field.value

            setTimeout(() => {
                console.log('1ms later:')
                sitRep(field)
                console.log(`Restoring obfuscated value: ${obfuscatedValue}`)
                field.value = obfuscatedValue
            }, 1)
        }
    }

    disableRememberMe()
    // changePasswordInputsTypeToText()
    wrapObfuscationToRestoreObfuscatedValueAMomentLater()
})();
