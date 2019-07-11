import React, { Component } from "react";
import styled from "styled-components";

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px 20%;
`;

const CardsGroup = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Card = styled.div`
  display: grid;
  grid-template-columns: 0.3fr 8fr 1fr;
  grid-template-rows: 1fr 2fr 3fr;
  position: relative;
  width: 30%;
  height: 150px;
  background: #ffffff;
  border: 2px solid #ededed;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 10px;
  margin-left: 10px;
  &:hover {
    top: -2px;
    box-shadow: 1px 4px 11px -9px rgba(0, 0, 0, 0.52);
  }
`;

const CardIcon = styled.div`
  grid-row: 1;
  grid-column: 2;
  padding-top: 20px;
`;
const CardHeader = styled.h2`
  grid-row: 2;
  grid-column: 2;
`;
const CardDescription = styled.div`
  grid-row: 3;
  grid-column: 2;
`;

export default class MyTrademarks extends Component {
  state = {
    tokenList: []
  }
  async componentDidMount() {
    const { contract, accounts } = this.props;
    const response = await contract.methods.getOwnedMarks().call({ from: accounts[0] })
    const noOfTokens = response.length
    if (noOfTokens > 0) {
      response.map(async each => {
        const tokenId = each.toNumber()
        await contract.methods.getMarkFromId(tokenId).call()
          .then(data =>
            this.setState({
              tokenList: [...this.state.tokenList, data],
            })
          )
          .catch(e => alert(e))
      })
    }
  }

  render() {

    return (
      <MainWrapper>
        <h2>Your Items</h2>
        {this.state.tokenList && (
          <CardsGroup>
            {this.state.tokenList.map((value, index) => (
              <Card key={index}>
                <CardIcon>{value[2]}</CardIcon>
                <CardHeader>{value[0]}</CardHeader>
                <CardDescription>{value[1]}</CardDescription>
                {/* <CardDescription>{value[3]}</CardDescription> */}
              </Card>
            ))}
          </CardsGroup>
        )}
      </MainWrapper>
    );
  }
}
