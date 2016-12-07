const choo = require('choo')

function devtools(app) {

  function onAction(data, state, name, caller, createSend) {
    const detail = {
      data,
      state,
      name,
      caller
    }
    const ev = new CustomEvent("__CHOO_DEVTOOLS__", { detail })
    window.dispatchEvent(ev);
  }

  app.use({
    onAction: onAction
  })

  return app
}

module.exports = devtools
