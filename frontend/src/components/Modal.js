import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";
import * as Constants from "./Const";

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem
    };
  }

  handleChange = e => {
    let { name, value } = e.target;
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }
    const activeItem = { ...this.state.activeItem, [name]: value };
    this.setState({ activeItem });
  };

  render() {
    const { toggle, onSave } = this.props;
    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}> Vocabulary </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="word">Vocabulary Word</Label>
              <Input
                type="text"
                name="word"
                value={this.state.activeItem.word}
                onChange={this.handleChange}
                placeholder="Enter a Vocabulary Word"
              />
            </FormGroup>
            <FormGroup>
              <Label for="meaning">Meaning</Label>
              <Input
                type="text"
                name="meaning"
                value={this.state.activeItem.meaning}
                onChange={this.handleChange}
                placeholder="Enter Meanings"
              />
            </FormGroup>
            <FormGroup>
              <Label for="test_status">Test Status</Label>
                <Input type="select" name="test_status" onChange={this.handleChange} value={this.state.activeItem.test_status}>
                  <option value={ Constants.UNTESTED }>Untested</option>
                  <option value={ Constants.FAMILIAR }>Familiar</option>
                  <option value={ Constants.REMEMBERED }>Remembered</option>
                </Input>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => onSave(this.state.activeItem)}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
