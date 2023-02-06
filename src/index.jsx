import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Survey from './pages/Survey'
import Home from './pages/Home'
import Header from './components/Header'
import Error from './components/Error'
import Freelances from './pages/Freelances'
import Results from './pages/Results'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/survey/:questionNumber">
          <Survey />
        </Route>
        <Route path="/freelances">
          <Freelances />
        </Route>
        <Route path="/results">
          <Results />
        </Route>
        <Route>
          <Error />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
