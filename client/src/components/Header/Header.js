import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { MetaMaskButton } from "rimble-ui";

//local imports
import GetAvatar from "./GetAvatar";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

const HeaderStyle = styled.div`
  display: flex;
  padding: 0px 100px;
  justify-content: space-between;
  background-color: #bef781;
  color: #0a1b2a;
  height: 60px;
  align-items: center;
  box-shadow: 0px 8px 4px -8px #777;

  &::selection {
    color: inherit;
  }
`;

const MenuStyle = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%;
  align-items: center;
`;

const AccountStyle = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LogoStyle = styled.p`
  font-weight: 800;
  font-size: 1.4rem;
  &:hover {
    cursor: pointer;
  }
  &::selection {
    color: inherit;
  }
`;

const HeaderItemStyle = styled.div`
  font-weight: 500;
  font-size: 0.9rem;
  &:hover {
    cursor: pointer;
  }
  &::selection {
    color: inherit;
  }
`;

const HeaderAccountItemStyle = styled.div`
  display: inline-flex;
  align-items: center;

  font-size: 0.9rem;
  font-weight: 400;
  &:hover {
    cursor: pointer;
  }
  &::selection {
    color: inherit;
  }
`;

const ConnectedDot = styled.div`
  height: 12px;
  width: 12px;
  border-radius: 50%;
  display: inline-block;
  background-color: #7cfc00;
  margin-right: 2px;
`;

const NetworkInfoStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: space-between;
  margin-right: 20px;
`;

const BalanceStyle = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  &:hover {
    cursor: pointer;
  }
  &::selection {
    color: inherit;
  }
`;

const AddressStyle = styled.div`
  text-decoration: underline;
`;

const ALinkStyle = styled.a`
  text-decoration: none;
  color: inherit;
`;

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFull: false
    };
  }

  render() {
    const { accounts, networkType, currentWallet, balance } = this.props;
    // console.log(accounts[0], networkType, currentWallet, balance);
    var walletAddress = accounts && accounts[0];
    var shortWalletAddress = accounts && walletAddress.substring(0, 10) + "...";
    const shortBalance =
      balance && (Math.round(balance * 100) / 100).toFixed(3);
    return (
      <HeaderStyle>
        <MenuStyle>
          <ALinkStyle href="/">
            <LogoStyle>BLOCKPECKER</LogoStyle>
          </ALinkStyle>
          <ALinkStyle href="/dashboard/create">
            <HeaderItemStyle>Register TM</HeaderItemStyle>
          </ALinkStyle>
          <ALinkStyle href="/dashboard/search">
            <HeaderItemStyle>Search</HeaderItemStyle>
          </ALinkStyle>
          <ALinkStyle href="/dashboard">
            <HeaderItemStyle>Dashboard</HeaderItemStyle>
          </ALinkStyle>
        </MenuStyle>
        {!accounts ? (
          <ALinkStyle href="/dashboard">
            <MetaMaskButton>Login</MetaMaskButton>
          </ALinkStyle>
        ) : (
          <AccountStyle>
            <NetworkInfoStyle>
              <HeaderAccountItemStyle>
                <ConnectedDot />
                {networkType === "private" ? "localhost" : networkType}
              </HeaderAccountItemStyle>
              <BalanceStyle>{shortBalance}</BalanceStyle>
            </NetworkInfoStyle>
            <HeaderAccountItemStyle
              onClick={() => {
                this.setState({ showFull: !this.state.showFull });
                // walletAddress.stringyfy().select();
                // document.execCommand("copy");
              }}
            >
              <GetAvatar {...this.props} />
              <AddressStyle>
                {this.state.showFull ? walletAddress : shortWalletAddress}
              </AddressStyle>
            </HeaderAccountItemStyle>
          </AccountStyle>
        )}
      </HeaderStyle>
    );
  }
}
