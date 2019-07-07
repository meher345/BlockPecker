import React, { Component } from "react";
import styled from "styled-components";

const MainWrapper = styled.div`
  display: flex;
  padding: 20px 40%;
  flex-direction: column;
  align-items: flex-start;
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

const CommonTextStyle = styled.div`
  padding: 0px 3px;
`;

const LineStyle = styled.div`
  display: inline-flex;
  margin: 10px 0px;
`;

const Button = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  color: black;
  background-color: #efefef;
  padding: 5px 20px;
  border-radius: 3px;
  /* border: 1px solid #777; */
  box-shadow: 4px 4px 9px -8px #777;
  &:hover {
    cursor: pointer;
    box-shadow: 4px 4px 9px -4px #777;
  }
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
          <CommonTextStyle>Enter Word Mark: </CommonTextStyle>
          <InputStyle
            onChange={e => this.setState({ wordMark: e.target.value })}
          />
        </LineStyle>
        <LineStyle>
          <CommonTextStyle>Enter ID: </CommonTextStyle>
          <InputStyle
            onChange={e => this.setState({ wordMarkID: e.target.value })}
          />
        </LineStyle>

        <Button
          onClick={() =>
            this.createMark(this.state.wordMark, this.state.wordMarkID)
          }
        >
          Submit
        </Button>
        <LineStyle>
          <CommonTextStyle>Response: </CommonTextStyle>
          {this.state.markResponse && <p>Created</p>}
        </LineStyle>
      </MainWrapper>
    );
  }
}
