// popup主动发消息给content-script
$('#send_message_to_content_script').click(() => {
  getCurrentTabId(function (tabId) {
    if (tabId == null) {
      alert('无法获取tabId, 运行终止');
      return;
    }

    // 发送数据到指定的tab页面
    chrome.tabs.sendMessage(tabId, '你好，我是popup！', function (response) {
      console.log('收到来自content-script的回复：' + response);
    });
  });
});

// 监听来自content-script的消息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log('我是popup，我收到来自content-script发送的消息：', request)
  sendResponse('你好，我是pop, 我收到了消息!');
});

$('#connect_to_content_script').click(() => {
  getCurrentTabId(function (tabId) {
    if (tabId == null) {
      alert('无法获取tabId, 运行终止');
      return;
    }

    const port = chrome.tabs.connect(tabId, { name: 'popup' });
    port.postMessage('你好，我是popup!');
    port.onMessage.addListener(function (msg) {
      console.log('收到content-script发送的消息：', msg);
      port.postMessage({ msg: '你好，我是popup，我再次发送消息！', stop: true});
    });
  });
});

// 获取当前选项卡ID
function getCurrentTabId(callback)
{
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
  {
      if(callback) callback(tabs.length ? tabs[0].id: null);
  });
}
