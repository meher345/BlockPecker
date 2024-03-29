import React, { Component } from "react";
import { Button, Segment, Image, Header, Label } from "semantic-ui-react";
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
        console.log(data)
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
              <Header as="h4">
                Trademark Type:
                <Label style={{ marginLeft: "20px" }} tag>
                  {this.state.tokenDetails[2]}
                </Label>
              </Header>
              <Header size="medium" dividing>
                Trademark Description: {this.state.tokenDetails[1]}
              </Header>
              {this.state.ipfsImg ? (
                <Image
                  src={"data:image/png;base64," + this.state.ipfsImg}
                  bordered
                />
              ) : (
                <Image
                  src={
                    "data:image/png;base64,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"
                  }
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
