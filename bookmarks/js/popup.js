$('#bookmarks').click(function () {
    // 获取background的全局window
    const bgWindow = chrome.extension.getBackgroundPage();
    const allBookmarks = bgWindow.getAllBookmarks();
});
