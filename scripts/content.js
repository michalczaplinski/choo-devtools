window.addEventListener('click', function(e) {
  chrome.runtime.sendMessage({text: Date.now().toString()});
});

window.addEventListener('__CHOO_DEVTOOLS__', function(e) {
  console.log(e.detail);
  chrome.runtime.sendMessage({text: e.detail});
});
