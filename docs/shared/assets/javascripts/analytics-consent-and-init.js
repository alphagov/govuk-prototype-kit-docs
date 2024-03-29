/* global $ */

(() => {
  $(document).ready(function () {
    runAnalyticsAndBanner()
  })

  function runAnalyticsAndBanner () {
    window.GPK_CONSENT_COOKIE_VERSION = 1

    /* Name of the cookie to save users cookie preferences to. */
    const CONSENT_COOKIE_NAME = 'prototype_kit_docs_cookies_policy'

    const TRACKING_LIVE_ID = '26179049-11'

    const COOKIE_CATEGORIES = {
      analytics: ['_ga', '_gid', '_gat_UA-' + TRACKING_LIVE_ID],
      essential: [CONSENT_COOKIE_NAME]
    }
    const DEFAULT_COOKIE_CONSENT = {
      analytics: false
    }

    function runAnalytics () {
      (function (w, d, s, l, i) {
        w[l] = w[l] || []
        w[l].push({
          'gtm.start': new Date().getTime(),
          event: 'gtm.js'
        })
        const f = d.getElementsByTagName(s)[0]
        const j = d.createElement(s)
        const dl = l !== 'dataLayer' ? '&l=' + l : ''
        j.async = true
        j.src =
          'https://www.googletagmanager.com/gtm.js?id=' + i + dl
        f.parentNode.insertBefore(j, f)
      })(window, document, 'script', 'dataLayer', 'GTM-TTGHPFQ')
    }

    function Cookie (name, value, options) {
      if (typeof value !== 'undefined') {
        if (value === false || value === null) {
          deleteCookie(name)
        } else {
          // Default expiry date of 30 days
          if (typeof options === 'undefined') {
            options = { days: 30 }
          }
          setCookie(name, value, options)
        }
      } else {
        return getCookie(name)
      }
    }

    function getConsentCookie () {
      const consentCookie = getCookie(CONSENT_COOKIE_NAME)
      let consentCookieObj

      if (consentCookie) {
        try {
          consentCookieObj = JSON.parse(consentCookie)
        } catch (err) {
          return null
        }
      } else {
        return null
      }

      return consentCookieObj
    }

    function isValidConsentCookie (options) {
      return (options && options.version >= window.GPK_CONSENT_COOKIE_VERSION)
    }

    /** Update the user's cookie preferences. */
    function setConsentCookie (options) {
      let cookieConsent = getConsentCookie()

      if (!cookieConsent) {
        cookieConsent = JSON.parse(JSON.stringify(DEFAULT_COOKIE_CONSENT))
      }

      // Merge current cookie preferences and new preferences
      for (const option in options) {
        cookieConsent[option] = options[option]
      }

      // Essential cookies cannot be deselected, ignore this cookie type
      delete cookieConsent.essential

      cookieConsent.version = window.GPK_CONSENT_COOKIE_VERSION

      // Set the consent cookie
      setCookie(CONSENT_COOKIE_NAME, JSON.stringify(cookieConsent), { days: 365 })

      // Update the other cookies
      resetCookies()
    }

    /** Apply the user's cookie preferences
     *
     * Deletes any cookies the user has not consented to.
     */
    function resetCookies () {
      let options = getConsentCookie()

      // If no preferences or old version use the default
      if (!isValidConsentCookie(options)) {
        options = JSON.parse(JSON.stringify(DEFAULT_COOKIE_CONSENT))
      }

      for (const cookieType in options) {
        if (cookieType === 'version') {
          continue
        }

        // Essential cookies cannot be deselected, ignore this cookie type
        if (cookieType === 'essential') {
          continue
        }

        // Initialise analytics if allowed
        if (cookieType === 'analytics' && options[cookieType]) {
          // Enable GA if allowed
          window['ga-disable-UA-' + TRACKING_LIVE_ID] = false
          runAnalytics()
        } else {
          // Disable GA if not allowed
          window['ga-disable-UA-' + TRACKING_LIVE_ID] = true
        }

        if (!options[cookieType]) {
          // Fetch the cookies in that category
          const cookiesInCategory = COOKIE_CATEGORIES[cookieType]

          cookiesInCategory.forEach(function (cookie) {
            // Delete cookie
            Cookie(cookie, null)
          })
        }
      }
    }

    function userAllowsCookieCategory (cookieCategory, cookiePreferences) {
      // Essential cookies are always allowed
      if (cookieCategory === 'essential') {
        return true
      }

      // Sometimes cookiePreferences is malformed in some of the tests, so we need to handle these
      try {
        return cookiePreferences[cookieCategory]
      } catch (e) {
        console.error(e)
        return false
      }
    }

    function userAllowsCookie (cookieName) {
      // Always allow setting the consent cookie
      if (cookieName === CONSENT_COOKIE_NAME) {
        return true
      }

      // Get the current cookie preferences
      let cookiePreferences = getConsentCookie()

      // If no preferences or old version use the default
      if (!isValidConsentCookie(cookiePreferences)) {
        cookiePreferences = DEFAULT_COOKIE_CONSENT
      }

      for (const category in COOKIE_CATEGORIES) {
        const cookiesInCategory = COOKIE_CATEGORIES[category]

        if (cookiesInCategory.indexOf(cookieName) !== '-1') {
          return userAllowsCookieCategory(category, cookiePreferences)
        }
      }

      // Deny the cookie if it is not known to us
      return false
    }

    function getCookie (name) {
      const nameEQ = name + '='
      const cookies = document.cookie.split(';')
      for (let i = 0, len = cookies.length; i < len; i++) {
        let cookie = cookies[i]
        while (cookie.charAt(0) === ' ') {
          cookie = cookie.substring(1, cookie.length)
        }
        if (cookie.indexOf(nameEQ) === 0) {
          return decodeURIComponent(cookie.substring(nameEQ.length))
        }
      }
      return null
    }

    function setCookie (name, value, options) {
      if (userAllowsCookie(name)) {
        if (typeof options === 'undefined') {
          options = {}
        }
        let cookieString = name + '=' + value + '; path=/'
        if (options.days) {
          const date = new Date()
          date.setTime(date.getTime() + (options.days * 24 * 60 * 60 * 1000))
          cookieString = cookieString + '; expires=' + date.toGMTString()
        }
        if (document.location.protocol === 'https:') {
          cookieString = cookieString + '; Secure'
        }
        document.cookie = cookieString
      }
    }

    function deleteCookie (name) {
      if (Cookie(name)) {
        // Cookies need to be deleted in the same level of specificity in which they were set
        // If a cookie was set with a specified domain, it needs to be specified when deleted
        // If a cookie wasn't set with the domain attribute, it shouldn't be there when deleted
        // You can't tell if a cookie was set with a domain attribute or not, so try both options
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/'
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;domain=' + window.location.hostname + ';path=/'
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;domain=.' + window.location.hostname + ';path=/'
      }
    }

    function showSuccess () {
      const $banner = document.querySelector('.js-cookies-page-success')
      $banner.removeAttribute('hidden')

      if (!$banner.getAttribute('tabindex')) {
        $banner.setAttribute('tabindex', '-1')
      }

      $banner.focus()

      // scroll to the top of the page
      window.scrollTo(0, 0)
    }

    // Show the banner if there is no consent cookie or if it is outdated
    const currentConsentCookie = document.cookie.match(new RegExp('(^| )' + CONSENT_COOKIE_NAME + '=([^;]+)'))

    const hasValidCookie = currentConsentCookie && isValidConsentCookie(JSON.parse(currentConsentCookie[2]))

    resetCookies()

    if (!currentConsentCookie || !hasValidCookie) {
      const cookieBanner = document.querySelector('.govuk-cookie-banner')
      if (cookieBanner && window.location.pathname !== '/docs/cookies') {
        cookieBanner.removeAttribute('hidden')
      } else {
        console.warn('No cookie banner found.')
      }
    }

    const $cookieConsentForm = document.querySelector('.cookie-consent-update')
    const $cookieBanner = document.querySelector('.govuk-cookie-banner')
    const $acceptButton = $cookieBanner.querySelector('.cookie-banner-accept-button')
    const $rejectButton = $cookieBanner.querySelector('.cookie-banner-reject-button')
    const $cookieMessage = $cookieBanner.querySelector('.govuk-cookie-banner__message')
    const $cookieConfirmationAccept = $cookieBanner.querySelector('.js-cookie-banner-confirmation-accept')
    const $cookieConfirmationReject = $cookieBanner.querySelector('.js-cookie-banner-confirmation-reject')
    const $hideButtons = $cookieBanner.querySelectorAll('.js-cookie-banner-hide')

    $acceptButton.addEventListener('click', (e) => {
      setConsentCookie({
        analytics: true
      })
      $cookieMessage.setAttribute('hidden', 'hidden')
      $cookieConfirmationAccept.removeAttribute('hidden')
    })
    $rejectButton.addEventListener('click', (e) => {
      setConsentCookie({
        analytics: false
      })
      $cookieMessage.setAttribute('hidden', 'hidden')
      $cookieConfirmationReject.removeAttribute('hidden')
    })
    $hideButtons.forEach($hideButton => $hideButton.addEventListener('click', (e) => {
      $cookieBanner.setAttribute('hidden', 'hidden')
    }))

    if ($cookieConsentForm) {
      const $yesInput = $cookieConsentForm.querySelector('input[value="yes"]')
      const $noInput = $cookieConsentForm.querySelector('input[value="no"]')
      if (userAllowsCookie('analytics')) {
        $yesInput.checked = true
      } else {
        $noInput.checked = true
      }
      $cookieConsentForm.addEventListener('submit', (e) => {
        e.preventDefault()
        setConsentCookie({
          analytics: $yesInput.checked
        })
        showSuccess()
      })
    }
  }
})()
