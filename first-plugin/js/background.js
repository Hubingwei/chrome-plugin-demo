console.log('background.js 正在运行...');

function setBgColor(color) {
  console.log('color', color);
  getCurrentTabId(function (tabId) {
    if (tabId == null) {
      alert('无法获取tabId, 运行终止');
      return;
    }

    // 发送数据到指定的tab页面
    chrome.tabs.sendMessage(tabId, { color }, function (res) {
      console.log(res.msg);
    });
  });
}

// 获取当前选项卡ID
function getCurrentTabId(callback)
{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
    {
        if(callback) callback(tabs.length ? tabs[0].id: null);
    });
}
