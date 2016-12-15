window.addEventListener('__CHOO_DEVTOOLS__', function(e) {
  chrome.runtime.sendMessage(e.detail);
});
