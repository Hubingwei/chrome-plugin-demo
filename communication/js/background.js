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

// manifest.json 配置清单
const manifest = {
  // 以下三项为必填项
  // 清单文件的版本，这个必须写，而且必须是2
  "manifest_version": 2,
  // 插件的名称
  "name": "demo",
  // 插件的版本
  "version": "1.0.0",

  // 插件描述
  "description": "简单的Chrome扩展demo",
  // 图标，一般偷懒全部用一个尺寸的也没问题
  "icons":
  {
    "16": "img/icon.png",
    "48": "img/icon.png",
    "128": "img/icon.png"
  },
  // 会一直常驻的后台JS或后台页面
  "background":
  {
    // 2种指定方式，如果指定JS，那么会自动生成一个背景页, 无法看到页面只能看到控制台
    "page": "background.html"
    //"scripts": ["js/background.js"]
  },
  // 浏览器右上角图标设置，browser_action、page_action、app必须三选一
  "browser_action":
  {
    "default_icon": "img/icon.png",
    // 图标悬停时的标题，可选
    "default_title": "这是一个示例Chrome插件",
    "default_popup": "popup.html"
  },
  // 当某些特定页面打开才显示的图标
	/*"page_action":
	{
		"default_icon": "img/icon.png",
		"default_title": "我是pageAction",
		"default_popup": "popup.html"
	},*/
  // 需要直接注入页面的JS
  "content_scripts":
    [
      {
        //"matches": ["http://*/*", "https://*/*"],
        // "<all_urls>" 表示匹配所有地址
        "matches": ["<all_urls>"],
        // 多个JS按顺序注入
        "js": ["js/jquery-1.8.3.js", "js/content-script.js"],
        // JS的注入可以随便一点，但是CSS的注意就要千万小心了，因为一不小心就可能影响全局样式
        "css": ["css/custom.css"],
        // 代码注入的时间，可选值： "document_start", "document_end", or "document_idle"，最后一个表示页面空闲时，默认document_idle
        "run_at": "document_start"
      },
    ],
  // 权限申请
  "permissions":
    [
      "contextMenus", // 右键菜单
      "tabs", // 标签
      "notifications", // 通知
      "webRequest", // web请求
      "webRequestBlocking",
      "storage", // 插件本地存储
      "http://*/*", // 可以通过executeScript或者insertCSS访问的网站
      "https://*/*" // 可以通过executeScript或者insertCSS访问的网站
    ],
  // 覆盖浏览器默认页面
  "chrome_url_overrides":
  {
    // 覆盖浏览器默认的新标签页
    "newtab": "newtab.html"
  },
  // 默认语言
  "default_locale": "zh_CN",
  // devtools页面入口，注意只能指向一个HTML文件，不能是JS文件
  "devtools_page": "devtools.html"
}
