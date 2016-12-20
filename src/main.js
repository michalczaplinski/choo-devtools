import choo from 'choo';
import html from 'choo/html';
import router from './router';
import model from './model';

const app = choo()

const backgroundPageConnection = chrome.runtime.connect({
  name: "panel"
})

backgroundPageConnection.postMessage({
  name: 'init',
  tabId: chrome.devtools
    ? chrome.devtools.inspectedWindow.tabId
    : 'TEST'
})

app.model(model)
app.router(router)

const tree = app.start()
document.body.appendChild(tree)
