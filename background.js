browser.action.onClicked.addListener(function (tab) {
  browser.tabs.sendMessage(tab.id, {
    command: 'toggle-youtube-overlay',
  })
})
