// Create a connection to the background page
var backgroundPageConnection = chrome.runtime.connect({
    name: "panel"
});

backgroundPageConnection.postMessage({
    name: 'init',
    tabId: chrome.devtools.inspectedWindow.tabId
});

backgroundPageConnection.onMessage.addListener(function(msg, sender){

  var newDiv = document.createElement("div");
  var text = document.createTextNode(msg.text);
  newDiv.appendChild(text)
  document.body.appendChild(newDiv);
})
