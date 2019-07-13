import React, { Component } from "react";
import styled from "styled-components";
import ipfs from "../../utils/ipfs";
import { Card, Button, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

const MainWrapper = styled.div`
  padding: 20px 15%;
  display: grid;
  grid-auto-flow: row;
  grid-column-gap: 10px;
`;

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
          .then(data => {
            var newData = data;
            newData["tokenId"] = tokenId;
            this.setState({
              tokenList: [...this.state.tokenList, newData]
            });
          })
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
      <MainWrapper>
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
                  {/* <a
                      href={`https://gateway.ipfs.io/ipfs/${value[3]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button>View on IPFS</Button>
                    </a>
                    <Button onClick={() => this.getFileFromIPFS(value[3])}>
                      get ipfs
                    </Button> */}
                  <Link
                    to={`/dashboard/view/${value &&
                      value.tokenId &&
                      value.tokenId}`}
                  >
                    <Button> View Details</Button>
                  </Link>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        )}
        {/* <Button onClick={() => console.log(this.state, this.props)}>
          Log state
        </Button> */}
      </MainWrapper>
    );
  }
}
