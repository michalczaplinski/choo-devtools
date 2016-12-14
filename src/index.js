const choo = require('choo')
const html = require('choo/html')

const app = choo()

const backgroundPageConnection = chrome.runtime.connect({
  name: "panel"
})

backgroundPageConnection.postMessage({
  name: 'init',
  tabId: chrome.devtools.inspectedWindow.tabId
})

app.model({
  namespace: 'app',
  state: {
    stateHistory: [],
    currentState: "not updated yet",
    newData: {} ,
  },
  subscriptions: [
    (send, done) => {
      backgroundPageConnection.onMessage.addListener((msg, sender) => {
        send('app:update', msg, (err) => {
          if (err) return done(err)
        })
      })
    }
  ],
  reducers: {
    update: (details, state) => {
      return {
        stateHistory: state.stateHistory.concat(details.state),
        currentState: details.state,
        newData: details,
      }
    }
  }
})

const view = (state, prev, send) => html`
  <main>
    <h2>Previous state:
      <pre>${JSON.stringify(state.app.currentState, null, 2)}</pre>
    </h2>
    <h2>
      New data:
      <pre>${JSON.stringify(state.app.newData, null, 2)}</pre>
    </h2>
    <h2>
      State history:
      <pre>${state.app.stateHistory.map(item => itemView(item))}</pre>
    </h2>
  </main>`

const itemView = (item) => html`
  <div>${JSON.stringify(item)}</div>`


app.router((route) => [
  route('/', view)
])

const tree = app.start()
document.body.appendChild(tree)
