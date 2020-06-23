// 每个匹配的页面都会注入当前js文件
console.log('content.js 已注入')

// 接收传递过来的消息
chrome.runtime.onMessage.addListener(function(req, sender, sendRes) {
  if (req && req.color) {
    console.log('req', req);
    document.body.style.backgroundColor = req.color;
  }

  sendRes({
      msg: '我是content.js, 背景色已修改完成'
  });
});