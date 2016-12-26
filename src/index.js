const choo = require('choo')
const html = require('choo/html')
const hash = require('object-hash');

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
    actions: [],
    ui: {}
  },
  subscriptions: [
    (send, done) => {
      backgroundPageConnection.onMessage.addListener((msg, sender) => {
        if (msg.type == 'ACTION') {
          send('app:addAction', msg, (err) => {
            if (err) return done(err)
          })
        } else if (msg.type == 'STATE_CHANGE') {
          send('app:stateChange', msg, (err) => {
            if (err) return done(err)
          })
        } else {
          throw new Error(`The message type is not known: ${msg.type}`)
        }
      })
    }
  ],
  reducers: {
    addAction: (action, state) => {
      return {
        actions: state.actions.concat(action),
      }
    },
    stateChange: (action, state) => {
      return {
        actions: state.actions.map((value) => {
          if (value.newState === undefined
            && value.name === action.caller
            && value.data
            && value.data.payload === action.data.payload) {
              value.newState = action.state
          }
          return value
        }),
      }
    }
  }
})

const view = (state, prev, send) => html`
  <main>
    <div>State:
      <pre>${JSON.stringify(state.app.actions.slice(-1)[0], null, 2)}</pre>
    </div>
    <div>
      Actions:
      <div>${state.app.actions.map(item => itemView(item))}</div>
    </div>
  </main>`

const itemView = (item) => html`
  <div>
    <pre>${JSON.stringify(item.state)}</pre>
    <pre>${item.newState ? JSON.stringify(item.newState) : 'no difference'}</pre>
  </div>
  `


app.router((route) => [
  route('/', view)
])

const tree = app.start()
document.body.appendChild(tree)

module.exports = app;
