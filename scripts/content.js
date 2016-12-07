window.addEventListener('click', function(e) {
  chrome.runtime.sendMessage({text: Date.now().toString()});
});

window.addEventListener('__CHOO_DEVTOOLS__', function(e) {
  chrome.runtime.sendMessage(e.detail);
});
