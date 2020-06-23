// 每个匹配的页面都会注入当前js文件
console.log('content.js 已注入')

// 接收传递过来的消息
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log('收到来自popup或者background发送的消息：' + request);

  setTimeout(() => {
    sendMessageToPopup();
  }, 4000);

  sendResponse('你好，我是content-script!');
});

// 主动发送消息给popup
function sendMessageToPopup(message) {
	chrome.runtime.sendMessage('你好，我是content-script，我在主动发消息', function(response) {
		console.log('收到来自pop或者background的回复，' + response);
	});
}

// 监听长连接
chrome.runtime.onConnect.addListener(function(port) {
	console.log(port);
	if(port.name == 'popup') {
		port.onMessage.addListener(function(request) {
      console.log('收到popup发的长连接消息：', request);
      if (typeof request !== 'object' || !request.stop) {
        port.postMessage('你好！我是content-script！')
      }
		});
	}
});
