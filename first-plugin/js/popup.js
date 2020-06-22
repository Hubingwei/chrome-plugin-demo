$('#btn-black').click(function () {
    // 获取background的全局window
    const bgWindow = chrome.extension.getBackgroundPage();
    bgWindow.setBgColor('black');
});

$('#btn-white').click(function () {
  // 获取background的全局window
  const bgWindow = chrome.extension.getBackgroundPage();
  bgWindow.setBgColor('white');
});
