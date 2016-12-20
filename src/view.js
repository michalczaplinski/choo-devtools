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

export default view;
