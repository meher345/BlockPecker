import React, { Component } from "react";
import styled from "styled-components";
import ipfs from "../../utils/ipfs";
import {
  Card,
  Button,
  Image,
  Label,
  Header,
  Divider,
  Icon
} from "semantic-ui-react";
import { Link } from "react-router-dom";

const MainWrapper = styled.div`
  padding: 20px 15%;
  display: grid;
  grid-auto-flow: row;
  grid-column-gap: 10px;
`;

export default class MyTrademarks extends Component {
  state = {
    tokenList: []
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
        <Header size="huge">My Items</Header>
        <Divider />
        {this.state.tokenList && (
          <Card.Group itemsPerRow={3}>
            {this.state.tokenList.map((value, index) => (
              <Card key={index}>
                <Card.Content>
                  <Card.Header>{value[0]}</Card.Header>
                  <Card.Meta>{value[2]}</Card.Meta>
                  <Card.Description>{value[1]}</Card.Description>
                  <div>
                    <Link
                      to={`/dashboard/view/${value &&
                        value.tokenId &&
                        value.tokenId}`}
                    >
                      <Button floated="right" basic color="black">
                        {" "}
                        View Details
                      </Button>
                    </Link>
                  </div>
                </Card.Content>

                {/* <Card.Content extra>
                  <Link
                    to={`/dashboard/view/${value &&
                      value.tokenId &&
                      value.tokenId}`}
                  >
                    <Button basic color="black">
                      {" "}
                      View Details
                    </Button>
                  </Link>
                </Card.Content> */}
              </Card>
            ))}
            <Card>
              <Card.Content>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    height: "100%",
                    alignItems: "center"
                  }}
                >
                  <Link to={"/dashboard/create"}>
                    <Button basic icon labelPosition="left">
                      <Icon name="plus" /> Register
                    </Button>
                  </Link>
                </div>
              </Card.Content>
            </Card>
          </Card.Group>
        )}
        {/* <Button onClick={() => console.log(this.state, this.props)}>
          Log state
        </Button> */}
      </MainWrapper>
    );
  }
}
