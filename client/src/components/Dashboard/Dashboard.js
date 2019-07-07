import React, { Component } from "react";
import styled from "styled-components";

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px 20%;
`;

export default class Dashboard extends Component {
  render() {
    return (
      <MainWrapper>
        <h2>Your Items</h2>
        <p>Item 1</p>
        <p>Item 2</p>
        <p>Item 3</p>
        <p>Item 4</p>
        <p>Item 5</p>
      </MainWrapper>
    );
  }
}
