import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class Home extends Component {
  render() {
    return (
      <div>
        <h2>Hello there...!</h2>
        <a href="/dashboard">Get Started</a>
      </div>
    );
  }
}
