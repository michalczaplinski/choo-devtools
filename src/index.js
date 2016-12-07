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

// backgroundPageConnection.onMessage.addListener((msg, sender) => {
//   send('app:update', msg, (err) => {
//     if (err) return done(err)
//   })
// })


app.model({
  namespace: 'app',
  state: {
    stateHistory: [],
    currentState: "not updated yet",
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
  // effects: {
  //   update: (data, state) => console.log(data)
  // }
  reducers: {
    update: (data, state) => {
      return {
        stateHistory: state.stateHistory.concat(data.state),
        currentState: data.state,
      }
    }
  }
})

const view = (state, prev, send) => html`
  <main>
    <h1>Current: ${JSON.stringify(state.app.currentState)}</h1>
    <h2>
      State history:
      ${state.app.stateHistory.map(item => itemView(item))}
    </h2>
  </main>`

const itemView = (item) => html`
  <div>${JSON.stringify(item)}</div>`


app.router((route) => [
  route('/', view)
])

const tree = app.start()
document.body.appendChild(tree)
