import React, { Component } from "react";
import styled from "styled-components";
import { Input, Field, Button, Select, ToastMessage, Flash } from "rimble-ui";
import ipfs from "../../utils/ipfs";
import rem from "../../components/helpers/rem";

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
    myMarks: null,
    buffer: "",
    ipfsHash: "QmcuZQyTzivQUH4ZruyR7sMwAjC5yZnMbTqXtFBjS6aD49",
    ipfsImg: ""
  };

  createMark = async (markName, markDesc, markType) => {
    const { accounts, contract } = this.props;

    await contract.methods
      .createMark(markName, markDesc, markType)
      .send({ from: accounts[0] });
    this.setState({ markResponse: true });
  };

  captureFile = event => {
    event.stopPropagation();
    event.preventDefault();
    const file = event.target.files[0];
    let reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => this.convertToBuffer(reader);
  };

  convertToBuffer = async reader => {
    //file is converted to a buffer to prepare for uploading to IPFS
    const buffer = await Buffer.from(reader.result);
    //set this buffer -using es6 syntax
    this.setState({ buffer });
  };

  uploadToIPFS = async event => {
    event.preventDefault();

    //save document to IPFS,return its hash#, and set hash# to state
    //https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#add
    await ipfs.add(this.state.buffer, (err, ipfsHash) => {
      console.log(err, ipfsHash);
      //setState by setting ipfsHash to ipfsHash[0].hash
      this.setState({ ipfsHash: ipfsHash[0].hash });
    }); //await ipfs.add
  }; //onSubmit

  getFileFromIPFS = async hash => {
    //save document to IPFS,return its hash#, and set hash# to state
    //https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#add
    await ipfs.get(hash, (err, files) => {
      if (err) {
        throw err;
      }
      files.forEach(file => {
        console.log(file.path);
        console.log("File content >> ", file.content);
        this.setState({ ipfsImg: file.content.toString("base64") });
      });
    });
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

            <Field label="Upload document to prove prior use: ">
              <input type="file" onChange={this.captureFile} />
            </Field>
            <button onClick={e => this.uploadToIPFS(e)}>Test ipfs</button>
            <button onClick={() => this.getFileFromIPFS(this.state.ipfsHash)}>
              get ipfs
            </button>

            {this.state.ipfsImg ? (
              <img
                src={"data:image/png;base64," + this.state.ipfsImg}
                height="200px"
                width="200px"
              />
            ) : (
              <p>Not Found</p>
            )}

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
