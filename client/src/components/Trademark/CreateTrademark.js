import React, { Component } from "react";
import styled from "styled-components";
import { Form, Button, Select, Textarea, Icon, Field } from "rimble-ui";
import Dropzone from "react-dropzone";
import ipfs from "../../utils/ipfs";
import { withRouter } from "react-router-dom";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";

const MainWrapper = styled.div`
  display: flex;
  padding: 20px 35%;
  flex-direction: column;
  align-items: flex-start;
`;

const DropZoneStyle = styled.div`
  align-items: center;
  background-color: transparent;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #4e3fce;
  display: inline-flex;
  font-weight: 600;
  height: 3rem;
  justify-content: space-between;
  line-height: 1.15;
  margin-bottom: 10px;
  min-width: 3rem;
  overflow: hidden;
  padding: 0 32px;
  position: relative;
  text-align: center;
  text-decoration: none;
  text-transform: none;
  transition-delay: 0s;
  transition-duration: 0.15s;
  transition-property: all;
  transition-timing-function: ease;
  user-select: none;
  white-space: nowrap;
  z-index: 0;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.2) 0 2px 4px;
    cursor: pointer;
    text-decoration: inherit inherit inherit;
    border: 1px solid #4e3fce;
  }
`;

const FieldLabel = styled.div`
  box-sizing: border-box;
  color: #3f3d4b;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.5;
  margin-bottom: 8px;
  text-align: left;
`;

const FormStyle = styled(Form)`
  display: flex;
  flex-direction: column;
`;

const LineAlignmentStyle = styled.div`
  display: inline-flex;
`;

class CreateTrademark extends Component {
  state = {
    markResponse: false,
    propertyType: "Trademark",
    markType: "Generic",
    className: "Class 1",
    markName: "",
    markDesc: "",
    myMarks: null,
    buffer: "",
    ipfsHash: "",
    ipfsImg: "",
    file: null,
    validated: false
  };

  createMark = async (markName, markDesc, markType, ipfsHash, className) => {
    const { accounts, contract } = this.props;
    await contract.methods
      .createMark(markName, markDesc, markType, ipfsHash, className)
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

  onDrop = files => {
    const file = files[0];
    this.setState({ file: file });
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
      // console.log(err, ipfsHash);
      //setState by setting ipfsHash to ipfsHash[0].hash
      this.setState({ ipfsHash: ipfsHash[0].hash });
    }); //await ipfs.add
  }; //onSubmit

  handleSubmit = async CreateTrademarkMutation => {
    if (!this.state.file) {
      throw alert("please upload a document");
    } else {
      await ipfs.add(this.state.buffer, async (err, ipfsHash) => {
        if (err) {
          throw err;
        }
        if (ipfsHash) {
          await this.createMark(
            this.state.markName,
            this.state.markDesc,
            this.state.markType,
            ipfsHash[0].hash,
            this.state.className
          );
        }
      });
    }
  };

  render() {
    return (
      <Mutation mutation={CreateTrademarkMutation}>
        {(CreateTrademark, { loading, error }) => {
          if (error) return `Error: ${error}`;
          return (
            <MainWrapper>
              <Field label="Type: ">
                <Select
                  required
                  items={["Trademark", "Copyright"]}
                  onChange={e =>
                    this.setState({ propertyType: e.target.value })
                  }
                />
              </Field>
              {this.state.propertyType === "Trademark" ? (
                <>
                  <h3> Register Trademark </h3>

                  <FormStyle>
                    <Field label="Trademark Type: ">
                      <Select
                        items={[
                          "Generic",
                          "Descriptive",
                          "Suggestive",
                          "Arbitrary/Fanciful"
                        ]}
                        onChange={e =>
                          this.setState({ markType: e.target.value })
                        }
                      />
                    </Field>
                    <LineAlignmentStyle>
                      <Field label="Trademark Class: ">
                        <Select
                          items={[
                            "Class 1",
                            "Class 2",
                            "Class 3",
                            "Class 4",
                            "Class 5",
                            "Class 6",
                            "Class 7",
                            "Class 8",
                            "Class 9",
                            "Class 10",
                            "Class 11",
                            "Class 12",
                            "Class 13",
                            "Class 14",
                            "Class 15",
                            "Class 16",
                            "Class 17",
                            "Class 18",
                            "Class 19",
                            "Class 20",
                            "Class 21",
                            "Class 22",
                            "Class 23",
                            "Class 24",
                            "Class 25",
                            "Class 26",
                            "Class 27",
                            "Class 28",
                            "Class 29",
                            "Class 30",
                            "Class 31",
                            "Class 32",
                            "Class 33",
                            "Class 34",
                            "Class 35",
                            "Class 36",
                            "Class 37",
                            "Class 38",
                            "Class 39",
                            "Class 40",
                            "Class 41",
                            "Class 42",
                            "Class 43",
                            "Class 44",
                            "Class 45"
                          ]}
                          onChange={e =>
                            this.setState({ className: e.target.value })
                          }
                        />
                      </Field>
                      <a href="/resources/trademark-class-list" target="_blank">
                        (see class list)
                      </a>
                    </LineAlignmentStyle>
                    <Field label="Trademark Name: ">
                      <Form.Input
                        width={520}
                        onChange={e =>
                          this.setState({ markName: e.target.value })
                        }
                      />
                    </Field>
                    <Field label="Trademark Description: ">
                      <Textarea
                        width={520}
                        rows={3}
                        onChange={e =>
                          this.setState({ markDesc: e.target.value })
                        }
                      />
                    </Field>
                    <Field label="Upload document to prove prior use: ">
                      <Dropzone onDrop={this.onDrop}>
                        {({ getRootProps, getInputProps }) => (
                          <DropZoneStyle {...getRootProps()}>
                            <Icon color="primary" name="CloudUpload" />
                            <input {...getInputProps()} />
                            {!this.state.file ? (
                              <p>Drag 'n' drop file here, or click to select</p>
                            ) : (
                              <p>{this.state.file && this.state.file.name}</p>
                            )}
                          </DropZoneStyle>
                        )}
                      </Dropzone>
                    </Field>
                    <Button
                      disabled={
                        loading ||
                        !this.state.markName ||
                        !this.state.markDesc ||
                        !this.state.buffer
                      }
                      onClick={async e => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log(this.state.className);
                        await CreateTrademark({
                          variables: {
                            name: this.state.markName,
                            description: this.state.markDesc,
                            type: this.state.markType,
                            className: this.state.className
                          }
                        });
                        await this.handleSubmit();
                        await setTimeout(function() {
                          return;
                        }, 500);
                        this.props.history.push("/dashboard");
                      }}
                    >
                      Register
                    </Button>
                  </FormStyle>
                </>
              ) : (
                <>
                  <h3>Register Copyright</h3>
                  <p>Coming soon...!</p>
                </>
              )}
            </MainWrapper>
          );
        }}
      </Mutation>
    );
  }
}

export default withRouter(CreateTrademark);

const CreateTrademarkMutation = gql`
  mutation CreateTrademarkMutation(
    $name: String!
    $description: String!
    $type: String!
    $className: String!
  ) {
    createTrademark(
      name: $name
      description: $description
      type: $type
      className: $className
    ) {
      id
    }
  }
`;
