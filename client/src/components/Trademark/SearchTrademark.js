import React, { Component } from "react";
import styled from "styled-components";

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px 250px;
`;

const InputStyle = styled.input`
  width: 100%;
  background-color: white;
  border: 1px solid #777;
  border-radius: 3px 0px 0px 3px;
  overflow: visible;
  padding: 0 0 0 4px;
  height: 40px;
  &:focus {
    outline-color: #333854;
    outline-style: none;
  }
`;

const Button = styled.div`
  font-weight: 600;
  color: #efefef;
  background-color: #333854;
  padding: 9px 25px;
  border-radius: 0px 3px 3px 0px;
  border: 1px solid #777;
  /* box-shadow: 2px 6px 8px -6px #777; */
  &:hover {
    cursor: pointer;
  }
`;

const SearchBarWrapper = styled.div`
  display: flex;
  width: 100%;
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
        {/* <h3>Get Mark by ID </h3>

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
        {this.state.markResponseText && <p>{this.state.markResponseText}</p>} */}
        <SearchBarWrapper>
          <InputStyle placeholder="Search..." />
          <Button>Search</Button>
        </SearchBarWrapper>
      </MainWrapper>
    );
  }
}
