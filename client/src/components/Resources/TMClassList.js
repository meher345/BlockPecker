import React, { Component } from "react";
import { Card, Label } from "semantic-ui-react";
import { GoodsAndServices } from "./RefData";
import styled from "styled-components";
import Header from "../Header/Header";

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 16%;
`;

export default class TMClassList extends Component {
  formatClassName = string => {
    return (
      string.charAt(0).toUpperCase() +
      string.slice(1, 5) +
      " " +
      string.slice(5)
    );
  };
  render() {
    console.log(GoodsAndServices);

    return (
      <>
        <Header />
        <MainWrapper>
          <Card.Group>
            {GoodsAndServices.map((item, index) => (
              <Card key={item.id}>
                <Card.Content>
                  <Card.Header>
                    {this.formatClassName(item.name)}
                    <Label style={{ float: "right" }} tag>
                      {item.classType}
                    </Label>
                  </Card.Header>

                  <Card.Description>{item.description}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </MainWrapper>
      </>
    );
  }
}
