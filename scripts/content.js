window.addEventListener('__CHOO_DEVTOOLS__:ACTION', function(e) {
  e.detail.type = 'ACTION';
  chrome.runtime.sendMessage(e.detail);
});

window.addEventListener('__CHOO_DEVTOOLS__:STATE_CHANGE', function(e) {
  e.detail.type = 'STATE_CHANGE';
  chrome.runtime.sendMessage(e.detail);
});
