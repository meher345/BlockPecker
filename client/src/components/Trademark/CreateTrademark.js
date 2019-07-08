import React, { Component } from "react";
import styled from "styled-components";
import { Input, Field, Button, Select, ToastMessage } from "rimble-ui";

const MainWrapper = styled.div`
  display: flex;
  padding: 20px 40%;
  flex-direction: column;
  align-items: flex-start;
`;

export default class CreateTrademark extends Component {
  state = {
    wordMark: null,
    wordMarkID: null,
    wordMarkIDget: null,
    markResponseText: null,
    markResponse: false,
    propertyType: "Trademark"
  };

  createMark = async (mark, id) => {
    const { accounts, contract } = this.props;
    console.log(accounts, "accounts");
    console.log(contract, "contract");
    // console.log(contract)
    await contract.methods.createMark(mark, id).send({ from: accounts[0] });
    this.setState({ markResponse: true });
  };

  render() {
    return (
      <MainWrapper>
        <Field label="Type: ">
          <Select
            required={true}
            items={["Trademark", "Copyright"]}
            onChange={e => this.setState({ propertyType: e.target.value })}
          />
        </Field>
        {this.state.propertyType === "Trademark" ? (
          <>
            <h3> Register Trademark </h3>

            <Field label="Enter Word Mark: ">
              <Input
                required={true}
                onChange={e => this.setState({ wordMark: e.target.value })}
              />
            </Field>

            <Field label="Enter ID: ">
              <Input
                required={true}
                onChange={e => this.setState({ wordMarkID: e.target.value })}
              />
            </Field>

            <Button
              onClick={() => {
                this.createMark(this.state.wordMark, this.state.wordMarkID);
                this.state.markResponse &&
                  window.toastProvider.addMessage("Created successfully...");
              }}
            >
              Create
            </Button>
            <ToastMessage.Provider
              ref={node => (window.toastProvider = node)}
            />
          </>
        ) : (
          <>
            <h3>Register Copyright</h3>
          </>
        )}
      </MainWrapper>
    );
  }
}
