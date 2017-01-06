const choo = require('choo')
const html = require('choo/html')
const _ = require('lodash');

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
              //FIXME: might have to updated that to take into acount comparing objects.
              && value.data.payload === action.data.payload
            ) {
            value.newState = action.state;
          } else {
            value.newState = value.state;
          }
          return value
        }),
      }
    }
  }
})

const view = (state, prev, send) => {
  const action = state.app.actions.slice(-1)[0] || {}
  const newState = action.newState || {}

  return html`
  <main class="main">
    <div class="actions-box">Actions:
      <div>${state.app.actions.map(item => actionView(item))}</div>
    </div>
    <div class="divider-line"></div>
    <div class="content-box">
      State:
      <pre>${JSON.stringify(newState, null, 2)}</pre>
    </div>
  </main>`
}

const actionView = item => html`
  <div class="actions-box-item">
    <span>${item.name}</span>
    <span>${item.caller}</span>
    <span>${(item.data && item.data.payload) ? item.data.payload : ''}</span>
  </div>
  `


app.router((route) => [
  route('/', view)
])

const tree = app.start()
document.body.appendChild(tree)

module.exports = app;
