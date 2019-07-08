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

export default class TMList extends Component {
  render() {
    return (
      <MainWrapper>
        <h2>Your Items</h2>
        <CardsGroup>
          <Card>
            <CardIcon>F</CardIcon>

            <CardHeader>First Trademark</CardHeader>
            <CardDescription>Decription goes here...</CardDescription>
          </Card>

          <Card>
            <CardIcon>S</CardIcon>
            <CardHeader>Second Trademark</CardHeader>
            <CardDescription>Decription goes here...</CardDescription>
          </Card>

          <Card>
            <CardIcon>T</CardIcon>
            <CardHeader>Third Trademark</CardHeader>
            <CardDescription>Decription goes here...</CardDescription>
          </Card>
          <Card>
            <CardIcon>G</CardIcon>
            <CardHeader>Genysis Mark</CardHeader>
            <CardDescription>Decription goes here...</CardDescription>
          </Card>
          <Card>
            <CardIcon>B</CardIcon>
            <CardHeader>BLOCKPECKER TM</CardHeader>
            <CardDescription>Decription goes here...</CardDescription>
          </Card>
          <Card>
            <CardIcon>C</CardIcon>
            <CardHeader>Random TM</CardHeader>
            <CardDescription>Decription goes here...</CardDescription>
          </Card>
          <Card>
            <CardIcon>R</CardIcon>
            <CardHeader>Random TM 2</CardHeader>
            <CardDescription>Decription goes here...</CardDescription>
          </Card>
        </CardsGroup>
      </MainWrapper>
    );
  }
}
