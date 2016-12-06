const choo = require('choo')

function devtools(app) {

  app.use({
    onAction: (data, state, name, caller, createSend) => {
      var ev = new CustomEvent(
        "__CHOO_DEVTOOLS__",
        {detail: "hello from choo"}
      );
      window.dispatchEvent(ev);
    }
  })
  return app
}

module.exports = devtools
