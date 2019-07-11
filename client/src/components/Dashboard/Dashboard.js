import React, { Component } from "react";
import TMList from "./TMList";

export default class Dashboard extends Component {
  componentDidMount() {
    console.log("Dashboard component Mount ")
  }
  render() {
    return <TMList />;
  }
}
