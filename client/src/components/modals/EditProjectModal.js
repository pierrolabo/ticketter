import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import Select from 'react-select';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { clearErrors } from '../../actions/errorActions';
import { updateProject } from '../../actions/projectActions';
import { USER_LOADING } from '../../actions/types';

class EditProjectModal extends Component {
  static propTypes = {
    updateProject: PropTypes.func.isRequired,
  };

  state = {
    name: '',
    description: '',
    status: '',
    _id: null,
    assigned_to: null,
    projectID: '',
    nextProjID: null,
  };
  componentWillMount() {
    //this.props.getUsers();
    const { name, description, _id } = this.props.editProject;
    this.setState({ name, description, _id });
  }
  handleSubmitModal = () => {};
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSave = () => {
    const { name, description, _id } = this.state;
    const updatedProject = { name, description, _id };
    this.props.updateProject(updatedProject);
    //  Close modal
    this.props.toggleModal();
  };
  render() {
    return (
      <Modal isOpen={this.props.modal} toggle={this.props.toggleModal}>
        <ModalHeader toggle={this.props.toggleModal}>EDIT Ticket</ModalHeader>
        <ModalBody>
          <Form onSubmit={this.handleSave}>
            <FormGroup>
              <Label for='name'>Name</Label>
              <Input
                type='name'
                name='name'
                id='name'
                value={this.state.name}
                onChange={this.handleChange}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label for='description'>Description</Label>
              <Input
                type='textarea'
                name='description'
                id='textarea'
                value={this.state.description}
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Button color='secondary'>Cancel</Button>
              <Button onClick={this.handleSave} color='success'>
                Save
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}

export default connect(null, { updateProject })(EditProjectModal);
