// popup主动发消息给content-script
$('#send_message_to_content_script').click(() => {
  getCurrentTabId(function (tabId) {
    if (tabId == null) {
      alert('无法获取tabId, 运行终止');
      return;
    }

    // 发送数据到指定的tab页面
    chrome.tabs.sendMessage(tabId, '你好，我是popup！', function (response) {
      if (response) alert('收到来自content-script的回复：' + response);
    });
  });
});

// 监听来自content-script的消息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log('收到来自content-script的消息：');
  console.log(request, sender, sendResponse);
  sendResponse('我是popup，我已收到你的消息：' + JSON.stringify(request));
});

// 获取当前选项卡ID
function getCurrentTabId(callback)
{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
    {
        if(callback) callback(tabs.length ? tabs[0].id: null);
    });
}
