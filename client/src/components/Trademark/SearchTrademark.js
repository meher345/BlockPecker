import React, { Component } from "react";
import styled from "styled-components";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { ApolloConsumer } from "react-apollo";

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px 250px;
`;

const InputStyle = styled.input`
  width: 100%;
  background-color: white;
  border: 1px solid #777;
  border-radius: 3px 0px 0px 3px;
  overflow: visible;
  padding: 0 0 0 4px;
  height: 40px;
  &:focus {
    outline-color: #333854;
    outline-style: none;
  }
`;

const Button = styled.div`
  font-weight: 600;
  color: #efefef;
  background-color: #333854;
  padding: 9px 25px;
  border-radius: 0px 3px 3px 0px;
  border: 1px solid #777;
  /* box-shadow: 2px 6px 8px -6px #777; */
  &:hover {
    cursor: pointer;
  }
`;

const SearchBarWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const SearchResultsStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const EachResultStyle = styled.div`
  display: grid;
  grid-template-rows: 5;
  grid-template-columns: 5fr 5fr;
  background-color: white;
  box-shadow: 5px 5px 6px -4px #efefef;
  margin-bottom: 10px;
  padding: 20px;
  border: 1px solid #777;
  grid-row-gap: 8px;
`;

const EachResultItemStyle = styled.div`
  font-size: 1rem;
  padding-left: 5px;
`;

const GenericHeading = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
`;

const SearchTMCreatedAtStyle = styled.div`
  grid-row: 5;
  grid-column: 1;
  display: flex;
  flex-direction: row;
`;

const SearchTMNameStyle = styled.div`
  grid-row: 1;
  grid-column: 1/3;
  display: flex;
  flex-direction: row;
`;
const SearchTMDescStyle = styled.div`
  grid-row: 2;
  grid-column: 1/3;
  display: flex;
  flex-direction: row;
`;
const SearchTMTypeStyle = styled.div`
  grid-row: 3;
  grid-column: 1/3;
  display: flex;
  flex-direction: row;
`;
const SearchTMClassStyle = styled.div`
  grid-row: 4;
  grid-column: 1/3;
  display: flex;
  flex-direction: row;
`;

const searchTrademarks = gql`
  query searchTrademarks($searchString: String!) {
    searchTrademarks(searchString: $searchString) {
      id
      name
      description
      type
      className
      createdAt
    }
  }
`;

export default class SearchTrademark extends Component {
  state = {
    searchString: "",
    searchResults: null
  };

  render() {
    return (
      // <Query
      //   query={gql`
      //     {
      //       searchTrademarks(searchString: "") {
      //         id
      //         createdAt
      //         updatedAt
      //         published
      //         name
      //         description
      //         type
      //       }
      //     }
      //   `}
      // >
      //   {({ loading, error, data }) => {
      //     if (loading) return <p>Loading...</p>;
      //     if (error) return <p>Error :(</p>;
      //     return data.searchTrademarks.map(
      //       ({
      //         id,
      //         createdAt,
      //         updatedAt,
      //         published,
      //         name,
      //         description,
      //         type
      //       }) => (
      //         <div key={id}>
      //           <p>{`${name} by ${description}`}</p>
      //         </div>
      //       )
      //     );
      //   }}
      // </Query>
      <ApolloConsumer>
        {client => (
          <MainWrapper>
            <SearchBarWrapper>
              <InputStyle
                onChange={e => this.setState({ searchString: e.target.value })}
                placeholder="Search..."
              />
              <Button
                onClick={async () => {
                  const { data } = await client.query({
                    query: searchTrademarks,
                    variables: { searchString: this.state.searchString }
                  });
                  this.setState({ searchResults: data.searchTrademarks });
                  console.log(this.state);
                }}
              >
                Search
              </Button>
            </SearchBarWrapper>
            {this.state.searchResults && (
              <SearchResultsStyle>
                {this.state.searchResults.map(eachResult => (
                  <EachResultStyle key={eachResult.id}>
                    <SearchTMNameStyle>
                      <GenericHeading>Trademark Name: </GenericHeading>
                      <EachResultItemStyle>
                        {eachResult.name}
                      </EachResultItemStyle>
                    </SearchTMNameStyle>

                    <SearchTMDescStyle>
                      <GenericHeading>Trademark Description: </GenericHeading>
                      <EachResultItemStyle>
                        {eachResult.description}
                      </EachResultItemStyle>
                    </SearchTMDescStyle>

                    <SearchTMTypeStyle>
                      <GenericHeading>Trademark Type: </GenericHeading>
                      <EachResultItemStyle>
                        {eachResult.type}
                      </EachResultItemStyle>
                    </SearchTMTypeStyle>

                    <SearchTMClassStyle>
                      <GenericHeading>Trademark Class: </GenericHeading>
                      <EachResultItemStyle>
                        {eachResult.className}
                      </EachResultItemStyle>
                    </SearchTMClassStyle>
                    <SearchTMClassStyle>
                      <GenericHeading>Created On </GenericHeading>
                      <EachResultItemStyle>
                        {eachResult.createdAt}
                      </EachResultItemStyle>
                    </SearchTMClassStyle>
                  </EachResultStyle>
                ))}
              </SearchResultsStyle>
            )}
          </MainWrapper>
        )}
      </ApolloConsumer>
    );
  }
}
