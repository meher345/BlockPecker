import React, { Component } from "react";
import TrademarkArtifact from "./contracts/Trademark.json";
import getWeb3 from "./utils/getWeb3";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

//local imports
import "./App.css";
import CreateTrademark from "./components/Trademark/CreateTrademark";
import Header from "./components/Header/Header";
import LoaderComponent from "./components/LoaderComponent.js";
import SearchTrademark from "./components/Trademark/SearchTrademark.js";
class App extends Component {
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
      return <LoaderComponent />;
    }
    return (
      <div className="App">
        <Router>
          <Header {...this.state} />
          {/* <Route exact path="/" component={CreateTrademark} /> */}
          <Route
            path="/create"
            render={() => (
              <CreateTrademark
                contract={this.state.contract}
                accounts={this.state.accounts}
              />
            )}
          />
          <Route
            path="/search"
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

export default App;
