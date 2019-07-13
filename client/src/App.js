import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

//local imports

import Dashboard from "./components/Dashboard/Dashboard";
import Home from "./components/Home/Home.js";
import { NotFound } from "./components/NotFound";
import TMClassList from "./components/Resources/TMClassList";

const client = new ApolloClient({
  uri: "http://localhost:4000/"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />

              <Route path="/dashboard" render={() => <Dashboard />} />
              <Route
                path="/resources/trademark-class-list"
                render={() => <TMClassList />}
              />
              <Route component={NotFound} status={404} />
            </Switch>
          </Router>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
