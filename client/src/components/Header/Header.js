import React, { Component } from "react";
import styled from "styled-components";

//local imports
import GetAvatar from "./GetAvatar";

const HeaderStyle = styled.div`
  display: flex;
  padding: 0px 200px;
  justify-content: space-between;
  background-color: #333854;
  color: #efefef;
  /* width: 60%; */
  height: 60px;
  align-items: center;
  box-shadow: 0px 8px 4px -8px #777;
`;

const LogoStyle = styled.p`
  font-weight: 800;
  font-size: 1.4rem;
  &:hover {
    cursor: pointer;
  }
`;

const HeaderItemStyle = styled.p`
  font-weight: 500;
  &:hover {
    cursor: pointer;
  }
`;

export default class Header extends Component {
  render() {
    const { accounts, networkType, currentWallet, balance } = this.props;
    console.log(accounts[0], networkType, currentWallet, balance);

    return (
      <HeaderStyle>
        <LogoStyle>BLOCKPECKER</LogoStyle>
        <HeaderItemStyle>Purchase Token</HeaderItemStyle>
        <HeaderItemStyle>All Tokens</HeaderItemStyle>
        <HeaderItemStyle>My Purchase History</HeaderItemStyle>
        <HeaderItemStyle>
          {networkType === "private" ? "localhost" : networkType}
        </HeaderItemStyle>
        <HeaderItemStyle>{balance}</HeaderItemStyle>
        <GetAvatar {...this.props} />
        <HeaderItemStyle>{accounts[0]}</HeaderItemStyle>
      </HeaderStyle>
    );
  }
}
