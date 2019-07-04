import React, { Component } from "react";
import styled from "styled-components";

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default class CreateTrademark extends Component {
  state = {
    wordMark: null,
    wordMarkID: null,
    wordMarkIDget: null,
    markResponseText: null,
    markResponse: false
  };

  createMark = async (mark, id) => {
    const { accounts, contract } = this.props;
    console.log(accounts, "accounts");
    console.log(contract, "contract");

    await contract.methods.createMark(mark, id).send({ from: accounts[0] });
    this.setState({ markResponse: true });
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
        <h3> Register Trademark </h3>

        <div>
          <div>Enter Word Mark</div>
          <input onChange={e => this.setState({ wordMark: e.target.value })} />
        </div>
        <div>
          <div>Enter ID</div>
          <input
            onChange={e => this.setState({ wordMarkID: e.target.value })}
          />
        </div>

        <div>
          <button
            onClick={() =>
              this.createMark(this.state.wordMark, this.state.wordMarkID)
            }
            size="small"
          >
            Submit
          </button>
        </div>
        {this.state.markResponse && <p>Created</p>}

        <p>------------------</p>
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
