import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Loader } from "rimble-ui";
import styled from "styled-components";

//local imports
import TrademarkArtifact from "../../contracts/Trademark.json";
import getWeb3 from "../../utils/getWeb3";
import CreateTrademark from "./CreateTrademark";
import Header from "../Header/Header";
import SearchTrademark from "./SearchTrademark.js";
import Dashboard from "../Dashboard/Dashboard.js";

const LoaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  padding: 20% 40%;
  height: 100%;
  width: 100%;
`;

class Trademark extends Component {
  state = {
    storageValue: 0,
    web3: null,
    accounts: null,
    contract: null,
    networkId: null,
    networkType: null,
    isMetaMask: null,
    balance: null
  };

  renderLoader() {
    return (
      <LoaderWrapper>
        <Loader size="80px" />
        <h3> Loading Web3, accounts and contract...</h3>
        <p> Unlock your metamask </p>
      </LoaderWrapper>
    );
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const networkType = await web3.eth.net.getNetworkType();
      // const isMetaMask = (web3._currentProvider.host = "metamask"
      //   ? true
      //   : false);
      const currentWallet = web3._currentProvider.host;
      let balance =
        accounts.length > 0
          ? await web3.eth.getBalance(accounts[0])
          : web3.utils.toWei("0");
      balance = web3.utils.fromWei(balance, "ether");
      const deployedNetwork = TrademarkArtifact.networks[networkId];
      const instance = new web3.eth.Contract(
        TrademarkArtifact.abi,
        deployedNetwork && deployedNetwork.address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({
        web3,
        accounts,
        contract: instance,
        networkId,
        networkType,
        currentWallet,
        balance
      });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  render() {
    if (!this.state.web3) {
      return this.renderLoader();
    }
    return (
      <div className="Trademark">
        <Router>
          <Header {...this.state} />
          {/* <Route exact path="/" component={CreateTrademark} /> */}
          <Route exact path="/tm" render={() => <Dashboard />} />
          <Route
            path="/tm/create"
            render={() => (
              <CreateTrademark
                contract={this.state.contract}
                accounts={this.state.accounts}
              />
            )}
          />
          <Route
            path="/tm/search"
            render={() => <SearchTrademark contract={this.state.contract} />}
          />
          {/* <CreateTrademark
          contract={this.state.contract}
          accounts={this.state.accounts}
        />
        <SearchTrademark
          contract={this.state.contract}
          accounts={this.state.accounts}
        /> */}
        </Router>
      </div>
    );
  }
}

export default Trademark;