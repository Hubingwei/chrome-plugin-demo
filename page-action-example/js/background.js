console.log('background已注入');

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (tab.url.indexOf("baidu") !== -1) {
    chrome.pageAction.show(tabId);
  } else {
    chrome.pageAction.hide(tabId);
  }
});

chrome.tabs.onSelectionChanged.addListener(function (tabId, changeInfo) {
  chrome.tabs.get(tabId, function (tab) {
    if (tab.url.indexOf("baidu") !== -1) {
      chrome.pageAction.show(tabId);
    } else {
      chrome.pageAction.hide(tabId);
    }
  })
});
