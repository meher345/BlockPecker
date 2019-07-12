import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//local imports

import Dashboard from "./components/Dashboard/Dashboard";
import Home from "./components/Home/Home.js";
import { NotFound } from "./components/NotFound";


class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />

            <Route path="/dashboard" render={() => <Dashboard />} />
            <Route component={NotFound} status={404} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
