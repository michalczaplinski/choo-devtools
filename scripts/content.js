window.addEventListener('click', function(e) {
  chrome.runtime.sendMessage({text: Date.now().toString()});
});
