import React, { Component } from "react";
import styled from "styled-components";
import { Input, Field, Button, Select, ToastMessage, Flash } from "rimble-ui";

const MainWrapper = styled.div`
  display: flex;
  padding: 20px 40%;
  flex-direction: column;
  align-items: flex-start;
`;

export default class CreateTrademark extends Component {
  state = {
    markResponse: false,
    propertyType: "Trademark",
    markType: "Generic",
    markName: "",
    markDesc: "",
    myMarks: null
  };

  createMark = async (markName, markDesc, markType) => {
    const { accounts, contract } = this.props;

    await contract.methods
      .createMark(markName, markDesc, markType)
      .send({ from: accounts[0] });
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
            <Field label="Trademark Type: ">
              <Select
                required={true}
                items={[
                  "Generic",
                  "Descriptive",
                  "Suggestive",
                  "Arbitrary/Fanciful"
                ]}
                onChange={e => this.setState({ markType: e.target.value })}
              />
            </Field>
            <Field label="Enter Name: ">
              <Input
                required={true}
                onChange={e => this.setState({ markName: e.target.value })}
              />
            </Field>
            <Field label="Enter Description: ">
              <Input
                required={true}
                onChange={e => this.setState({ markDesc: e.target.value })}
              />
            </Field>

            <Button
              onClick={() => {
                this.createMark(
                  this.state.markName,
                  this.state.markDesc,
                  this.state.markType
                );

                // window.toastProvider.addMessage("Created successfully...");
              }}
            >
              Create
            </Button>
            {/* <Button onClick={() => console.log(this.state)}>Log State</Button> */}

            {this.state.markResponse && (
              <Flash my={3} variant="success">
                Created successfully...
              </Flash>
            )}

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
