import React, { Component } from "react";
import styled from "styled-components";

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default class SearchTrademark extends Component {
  state = {
    wordMarkIDget: null,
    markResponseText: null
  };

  getMark = async id => {
    const { contract } = this.props;
    // Get the value from the contract to prove it worked.
    const response = await contract.methods.lookUptokenIdToMarkInfo(id).call();
    // Update state with the result.
    this.setState({ markResponseText: response });
  };
  render() {
    return (
      <MainWrapper>
        <h3>Get Mark by ID </h3>

        <div>
          <div>Enter ID</div>
          <input
            onChange={e => this.setState({ wordMarkIDget: e.target.value })}
          />
        </div>

        <div>
          <button
            onClick={() => this.getMark(this.state.wordMarkIDget)}
            size="small"
          >
            Submit
          </button>
        </div>
        {this.state.markResponseText && <p>{this.state.markResponseText}</p>}
      </MainWrapper>
    );
  }
}
