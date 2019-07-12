import React, { Component } from "react";
import styled from "styled-components";
import ipfs from "../../utils/ipfs";
import { Card, Button, Container, Image } from "semantic-ui-react";

export default class MyTrademarks extends Component {
  state = {
    tokenList: [],
    ipfsImg: ""
  };
  async componentDidMount() {
    const { contract, accounts } = this.props;

    const response = await contract.methods
      .getOwnedMarks()
      .call({ from: accounts[0] });
    const noOfTokens = response.length;
    if (noOfTokens > 0) {
      response.map(async each => {
        const tokenId = each.toNumber();
        await contract.methods
          .getMarkFromId(tokenId)
          .call()
          .then(data =>
            this.setState({
              tokenList: [...this.state.tokenList, data]
            })
          )
          .catch(e => alert(e));
      });
    }
  }

  getFileFromIPFS = async hash => {
    //save document to IPFS,return its hash#, and set hash# to state
    //https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#add
    await ipfs.get(hash, (err, files) => {
      if (err) {
        throw err;
      }
      files.forEach(file => {
        this.setState({ ipfsImg: file.content.toString("base64") });
      });
    });
  };

  render() {
    return (
      <Container>
        <h2>Your Items</h2>
        {this.state.tokenList && (
          <Card.Group>
            {this.state.tokenList.map((value, index) => (
              <Card key={index}>
                {this.state.ipfsImg && (
                  <Image
                    src={"data:image/png;base64," + this.state.ipfsImg}
                    wrapped
                    ui={false}
                  />
                )}
                <Card.Content>
                  <Card.Header>{value[0]}</Card.Header>
                  <Card.Meta>{value[2]}</Card.Meta>
                  <Card.Description>{value[1]}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <a
                    href={`https://gateway.ipfs.io/ipfs/${value[3]}`}
                    target="_blank"
                  >
                    <Button>View on IPFS</Button>
                  </a>
                  <Button onClick={() => this.getFileFromIPFS(value[3])}>
                    get ipfs
                  </Button>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        )}
        <Button onClick={() => console.log(this.state)}>Log state</Button>
      </Container>
    );
  }
}
