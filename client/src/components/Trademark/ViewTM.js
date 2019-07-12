import React, { Component } from "react";
import { Button, Segment, Image, Header } from "semantic-ui-react";
import styled from "styled-components";
import ipfs from "../../utils/ipfs";

const MainWrapper = styled.div`
  padding: 20px 20%;
`;

export default class ViewTM extends Component {
  state = {
    tokenId: this.props.match.params.id,
    tokenDetails: null,
    ipfsImg: ""
  };
  async componentDidMount() {
    const { contract } = this.props;
    await contract.methods
      .getMarkFromId(this.state.tokenId)
      .call()
      .then(data => {
        this.setState({
          tokenDetails: data
        });
        ipfs.get(data[3], (err, files) => {
          if (err) {
            throw err;
          }
          files.forEach(file => {
            this.setState({ ipfsImg: file.content.toString("base64") });
          });
        });
      });
  }

  render() {
    return (
      <MainWrapper>
        {this.state.tokenDetails && (
          <>
            <Header as="h2" attached="top">
              Trademark Name: {this.state.tokenDetails[0]}
            </Header>
            <Segment attached>
              <Header size="medium">
                Trademark Type: {this.state.tokenDetails[2]}
              </Header>
              <Header size="medium" dividing>
                Trademark Description: {this.state.tokenDetails[1]}
              </Header>
              {this.state.ipfsImg && (
                <Image
                  src={"data:image/png;base64," + this.state.ipfsImg}
                  fluid
                  bordered
                />
              )}
              <a
                href={`https://gateway.ipfs.io/ipfs/${
                  this.state.tokenDetails[3]
                }`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button primary style={{ marginTop: "10px" }}>
                  View on IPFS
                </Button>
              </a>
            </Segment>
          </>
        )}
        {/* <Button onClick={() => console.log(this.state)}>Log state</Button> */}
      </MainWrapper>
    );
  }
}
