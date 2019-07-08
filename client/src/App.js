import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

//local imports

import Trademark from "./components/Trademark/Trademark.js";
import Home from "./components/Home/Home.js";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Route exact path="/" component={Home} />

          <Route path="/dashboard" render={() => <Trademark />} />
        </Router>
      </div>
    );
  }
}

export default App;
