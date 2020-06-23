console.log('background.js 正在运行...');

function getAllBookmarks () {
  chrome.bookmarks.getTree(results => console.log('result', results));
}
