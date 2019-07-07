import React, { Component } from "react";
import styled from "styled-components";

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// const RegisterTrademarkStyle = styled.div`
// display: grid;
// `;

const InputStyle = styled.input`
  background-color: white;
  border: 1px solid #777;
  border-radius: 3px;
  /* box-shadow: 0px 4px 2px -4px #777; */
  overflow: visible;
  padding: 0 0 0 3px;
  height: 20px;
  &:focus {
    outline-color: #333854;
    /* outline-style: none; */
  }
`;

const LineStyle = styled.div`
  display: inline-flex;
  margin-bottom: 10px;
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
    // console.log(contract)
    await contract.methods.createMark(mark, id).send({ from: accounts[0] });
    this.setState({ markResponse: true });
  };
  render() {
    return (
      <MainWrapper>
        <h3> Register Trademark </h3>

        <LineStyle>
          <div>Enter Word Mark</div>
          <InputStyle
            onChange={e => this.setState({ wordMark: e.target.value })}
          />
        </LineStyle>
        <LineStyle>
          <div>Enter ID</div>
          <InputStyle
            onChange={e => this.setState({ wordMarkID: e.target.value })}
          />
        </LineStyle>

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
      </MainWrapper>
    );
  }
}
