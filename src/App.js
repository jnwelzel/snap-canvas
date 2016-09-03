import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import Welcome from './Welcome'
import Canvas from './Canvas'
import NoMatch from './NoMatch'

const App = () => (
  <Router history={browserHistory}>
    <Route path="/" component={Welcome} />
    <Route path="/canvas" component={Canvas} />
    <Route path="*" component={NoMatch} />
  </Router>
)

export default App
