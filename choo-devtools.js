const choo = require('choo')

function devtools(app) {

  // remember that the order of (data, state) is swapped in 4.0
  function onAction(data, state, name, caller, createSend) {
    const detail = {
      data,
      state,
      name,
      caller
    }
    const ev = new CustomEvent("__CHOO_DEVTOOLS__:ACTION", { detail })
    window.dispatchEvent(ev);
    console.log('action data:', data);
    console.log('action state:', state);
    console.log('action name:', name);
  }

  // remember that the order of (data, state) is swapped in 4.0
  function onStateChange(data, state, prev, caller, createSend) {
    const detail = {
      data,
      state,
      prev,
      caller
    }

    const ev = new CustomEvent("__CHOO_DEVTOOLS__:STATE_CHANGE", { detail })
    window.dispatchEvent(ev);
    console.log('data:', data)
    console.log('state:', state)
    console.log('caller:', caller)
    console.log('======================================================')
  }

  app.use({
    onAction: onAction,
    onStateChange: onStateChange,
  })

  return app
}

module.exports = devtools
