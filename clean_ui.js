// https://stackoverflow.com/questions/5525071/how-to-wait-until-an-element-exists
waitForLoad = function (selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector))
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector))
        observer.disconnect()
      }
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })
  })
}

styleElementOnLoad = function (selector, styles) {
  waitForLoad(selector).then((el) => {
    Object.assign(el.style, styles)
  })
}

cleanUI = function () {
  styleElementOnLoad('.ytp-gradient-top', { display: 'none' })
  styleElementOnLoad('.ytp-chrome-top', { display: 'none' })
  styleElementOnLoad('.ytp-gradient-bottom', { display: 'none' })
  styleElementOnLoad('.ytp-chrome-bottom', { display: 'none' })
  styleElementOnLoad('.annotation.annotation-type-custom.iv-branding', {
    display: 'none',
  })
}

restoreUI = function () {
  styleElementOnLoad('.ytp-gradient-top', { display: '' })
  styleElementOnLoad('.ytp-chrome-top', { display: 'flex' })
  styleElementOnLoad('.ytp-gradient-bottom', { display: '' })
  styleElementOnLoad('.ytp-chrome-bottom', { display: '' })
  styleElementOnLoad('.annotation.annotation-type-custom.iv-branding', {
    display: '',
  })
}

toggleUI = function () {
  waitForLoad('.ytp-chrome-top').then((el) => {
    if (el.style.display !== 'none') {
      cleanUI()
    } else {
      restoreUI()
    }
  })
}

browser.runtime.onMessage.addListener((message) => {
  if (message.command === 'toggle-youtube-overlay') {
    toggleUI()
  }
})
