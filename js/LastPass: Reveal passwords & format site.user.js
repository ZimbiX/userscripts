// ==UserScript==
// @name         LastPass: Reveal passwords & format site
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://lastpass.com/?ac=1&lpnorefresh=1
// @icon         https://www.google.com/s2/favicons?domain=lastpass.com
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ZimbiX/userscripts/master/js/LastPass%3A%20Reveal%20passwords%20%26%20format%20site.user.js
// ==/UserScript==

(function() {
    'use strict';

    const addCss = (cssCode, doc = document) => {
        const styleElement = doc.createElement("style")
        styleElement.type = "text/css"
        doc.getElementsByTagName("head")[0].appendChild(styleElement)
        if (styleElement.styleSheet) {
            styleElement.styleSheet.cssText = cssCode
        } else {
            styleElement.innerHTML = cssCode
        }
    }

    const retryDelayMs = 10

    const logIn = (waitedMs = 0) => {
        const logInButton = Array.from(document.querySelectorAll('button')).find(button => button.textContent == 'Log In')
        if (logInButton) {
            console.log('Log in button found')
            const usernameInput = document.querySelector('#root input[name=username]')
            if (usernameInput) {
                console.log('Username input found')
                const usernameEntered = usernameInput.value
                if (usernameEntered != '') {
                    console.log('Username has been entered')
                    const passwordInput = document.querySelector('#root input[name=password]')
                    const usernameEntered = usernameInput.value
                    if (usernameEntered != '') {
                        console.log('Password has been entered')
                        setTimeout(() => {
                            console.log('Clicking the log in button')
                            logInButton.click()
                            waitForVaultToLoad(() => {
                                formatVault()
                            })
                        }, 100)
                        return
                    }
                }
            }
        }

        if (waitedMs < 4000) {
            console.log('Login form not ready; retrying shortly')
            setTimeout(() => {
                logIn(waitedMs + retryDelayMs)
            }, retryDelayMs)
        } else {
            console.log('Still no log in button found; giving up')
        }
    }

    const vaultDocument = () => {
        const vaultContainer = document.getElementById('newvault')
        return vaultContainer && vaultContainer.contentWindow.document
    }

    /*const vaultGetExtensionPromptBanner = (vault) => (
        Array
        .from(vault.querySelectorAll('.migrationBanner'))
        .find(e => e.textContent.includes('The easy life awaits! Install the LastPass browser extension for the best possible experience.'))
    )*/

    const removeEmptySpaceDueToHavingRemovedBanner = (vault, runMs = 0) => {
        addCss(
            '#options { top: 60px !important; } ' +
            '#main { top: 120px !important; } ',
            vault
        )

        /*Array.from(vault.querySelectorAll('#options, #main')).forEach(e => { e.style.top = '' })

        if (runMs < 4000) {
            setTimeout(() => {
                removeEmptySpaceDueToHavingRemovedBanner(vault, runMs + retryDelayMs)
            }, retryDelayMs)
        }*/
    }

    const removeVaultGetExtensionPromptBanner = (vault, waitedMs = 0) => {
        addCss(
            '.dialog.responsive.vault-info-banner.migrationBanner { display: none !important }',
            vault
        )
        removeEmptySpaceDueToHavingRemovedBanner(vault)

        /*const banner = vaultGetExtensionPromptBanner(vault)
        if (banner) {
            banner.style.display = 'none'
            removeEmptySpaceDueToHavingRemovedBanner(vault)
            return
        }

        if (waitedMs < 4000) {
            setTimeout(() => {
                removeVaultGetExtensionPromptBanner(vault, waitedMs + retryDelayMs)
            }, retryDelayMs)
        }*/
    }

    const dismissVaultGetExtensionPrompt = (vault) => {
        vault.querySelectorAll('#siteDialogPassword').forEach((pw) => (pw.type = 'text'))
        vault.querySelectorAll('.vault-info').forEach((info) => {
            if (info.textContent.includes('Download the LastPass browser extension')) {
                info.querySelector('#btnClose').click();
            }
        })
    }

    const setVaultViewToCompactList = (vault) => {
        vault.querySelectorAll('#sizeToggle[title="Show Compact View"]').forEach((btn) => (btn.click()))
        vault.querySelectorAll('#listButton[title="List View"]').forEach((btn) => (btn.click()))
    }

    const formatVault = () => {
        console.log('Formatting vault')
        const vault = vaultDocument()
        removeVaultGetExtensionPromptBanner(vault)
        dismissVaultGetExtensionPrompt(vault)
        setVaultViewToCompactList(vault)
    }

    const isVaultLoaded = () => {
        const vault = vaultDocument()
        if (!vault) {
            return false
        }
        const heading = vault.querySelector('#pageTitle')
        return heading && heading.innerText == "All Items"
    }

    const waitForVaultToLoad = (callback, waitedMs = 0) => {
        if (isVaultLoaded()) {
            console.log('Vault ready')
            callback()
            return
        }

        if (waitedMs < 30000) {
            console.log('Vault not ready; retrying shortly')
            setTimeout(() => {
                waitForVaultToLoad(callback, waitedMs + retryDelayMs)
            }, retryDelayMs)
        } else {
            console.log('Vault still not ready; giving up')
        }
    }

    if (document.title == 'LastPass - Sign In') {
        logIn()
    }
})();