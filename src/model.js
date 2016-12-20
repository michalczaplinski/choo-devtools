const model = {
  namespace: 'app',
  state: {
    stateHistory: [],
    currentState: "not updated yet",
    newData: {} ,
  },
  subscriptions: {
    change: (send, done) => {
      backgroundPageConnection.onMessage.addListener((msg, sender) => {
        send('app:update', msg, (err) => {
          if (err) return done(err)
        })
      })
    }
  },
  reducers: {
    update: (details, state) => {
      return {
        stateHistory: state.stateHistory.concat(details.state),
        currentState: details.state,
        newData: details,
      }
    }
  }
}

export default model;
