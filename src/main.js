const choo = require('choo')
const html = require('choo/html')
const app = choo()

app.model({
  state: { text: 'Not quite set yet' },
  reducers: {
    update: (data, state) => ({ text: data })
  }
})

const mainView = (state, prev, send) => html`
  <main>
    <h1>Title: ${state.text}</h1>
    <input
      type="text"
      oninput=${(e) => send('update', e.target.value)}/>
  </main>`

app.router((route) => [
  route('/', mainView)
])

const tree = app.start()
document.body.appendChild(tree)
