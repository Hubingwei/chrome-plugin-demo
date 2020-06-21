// 每个匹配的页面都会注入当前js文件
console.log('content.js 已注入')

// 接收传递过来的消息
chrome.runtime.onMessage.addListener(function(req, sender, sendRes) {
    console.log(req.msg);
    sendRes({
        msg: '我是content.js, 我已收到你的消息'
    });
});