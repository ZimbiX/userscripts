// ==UserScript==
// @name         Gnome Extensions: Improvements
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Adds an Upgrade All button to easily upgrade all extensions which are not disabled. Also greys out disabled extensions
// @author       Brendan Weibrecht
// @match        https://extensions.gnome.org/local/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=extensions.gnome.org
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // http://youmightnotneedjquery.com/#delegate
    const onEvent = (eventName, elementSelector, handler) => {
        addEventListener(eventName, function(e) {
            // loop parent nodes from the target to the delegation node
            for (var target = e.target; target && target != this; target = target.parentNode) {
                if (target.matches && target.matches(elementSelector)) {
                    handler.call(target, e)
                    break
                }
            }
        }, true)
    }

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

    const setClass = (element, className, enabled) => {
        const otherClasses = element.className.split(' ').filter(c => c !== className)
        element.className = (enabled ? otherClasses.concat([className]) : otherClasses).join(' ')
    }

    const dim = (element) => {
        setClass(element, 'zimbix-dimmed', true)
    }

    const undim = (element) => {
        setClass(element, 'zimbix-dimmed', false)
    }

    const findUpgradeButtonsForEnabledExtensions = () => (
        document.querySelectorAll('#local_extensions .extension.upgradable:not(.zimbix-dimmed) .upgrade-button:not(.zimbix-upgrade-all)')
    )

    const anyUpgradableExtensions = () => (
        findUpgradeButtonsForEnabledExtensions().length > 0
    )

    const upgradeAll = () => {
        const upgradeButtons = findUpgradeButtonsForEnabledExtensions()
        upgradeButtons.forEach(btn => btn.click())
    }

    const createUpgradeAllButton = () => {
        const anUpgradeButton = document.querySelector('.upgrade-button')
        if (!anUpgradeButton) { return }
        const upgradeAllButton = anUpgradeButton.cloneNode(true)
        upgradeAllButton.className = upgradeAllButton.className + ' zimbix-upgrade-all'
        upgradeAllButton.onclick = upgradeAll

        const upgradeAllButtonContainer = document.createElement('div')
        upgradeAllButtonContainer.className = "extension upgradable"
        upgradeAllButtonContainer.prepend(upgradeAllButton)

        document.querySelector('#local_extensions').prepend(upgradeAllButtonContainer)

        return upgradeAllButton
    }

    const addOrRefreshUpgradeAllButton = () => {
        let upgradeAllButton = document.querySelector('.zimbix-upgrade-all')
        if (!upgradeAllButton) {
            upgradeAllButton = createUpgradeAllButton()
            if (!upgradeAllButton) { return }
        }

        if (anyUpgradableExtensions()) {
            upgradeAllButton.title = "Upgrade all enabled extensions"
            undim(upgradeAllButton)
        } else {
            upgradeAllButton.title = "Nothing to upgrade"
            dim(upgradeAllButton)
        }
    }

    const dimDisabledExtensions = () => {
        const disabledExtensionsToggles = document.querySelectorAll('#local_extensions .extension:not(.zimbix-dimmed) ._gnome-switch:not(.activated):not(.error)')
        if (disabledExtensionsToggles.length > 0) {
            disabledExtensionsToggles.forEach(btn => dim(btn.closest('.extension')))
            setTimeout(dimDisabledExtensions, 1000)
        } else {
            setTimeout(dimDisabledExtensions, 50)
        }
        addOrRefreshUpgradeAllButton()
    }

    const undimExtension = (event) => {
        undim(event.target.closest('.extension'))
    }

    addCss(
        ".zimbix-dimmed { opacity: 0.2; brightness: 60% } " +
        ".extension.zimbix-dimmed { transition: opacity 0.15s } " +
        ".extension.zimbix-dimmed:hover { opacity: 1 } " +
        ".zimbix-upgrade-all { position: absolute; right: 46px; top: 12px; box-sizing: content-box }"
    )
    dimDisabledExtensions()
    onEvent('click', '#local_extensions .extension ._gnome-switch', undimExtension)
})();
