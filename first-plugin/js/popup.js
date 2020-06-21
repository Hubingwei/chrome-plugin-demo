$('#btn').click(function () {
    const str = "hello world";
    console.log(str);

    // 获取background的全局window
    const bgWindow = chrome.extension.getBackgroundPage();
    bgWindow.sendMsg(str);
});