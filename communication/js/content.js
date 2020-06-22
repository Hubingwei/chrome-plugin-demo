// 每个匹配的页面都会注入当前js文件
console.log('content.js 已注入')

// 接收传递过来的消息
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log('收到来自 ' + (sender.tab ? "content-script(" + sender.tab.url + ")" : "popup或者background") + ' 的消息：', request);

  sendResponse('我收到你的消息了：' + JSON.stringify(request));
});

// 主动发送消息给后台
// 要演示此功能，请打开控制台主动执行sendMessageToBackground()
function sendMessageToBackground(message) {
	chrome.runtime.sendMessage({greeting: message || '你好，我是content-script呀，我主动发消息给后台！'}, function(response) {
		tip('收到来自后台的回复：' + response);
	});
}
