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
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { updateProject } from '../../actions/projectActions';
import SelectMultiProjects from '../Select/SelectMultiUsers';

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
    userList: null,
    nextUserList: null,
  };
  UNSAFE_componentWillMount() {
    const { name, description, _id, userList } = this.props.editProject;
    this.setState({ name, description, _id, userList });
  }
  handleSubmitModal = () => {};
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSave = () => {
    const { name, description, _id } = this.state;
    let nextUsers = [];

    if (this.state.nextUserList) {
      nextUsers = this.state.nextUserList.map((user) => user.value);
    }
    const updatedProject = { name, description, _id, nextUsers };
    this.props.updateProject(updatedProject);
    //  Close modal
    this.props.toggleModal();
  };
  handleChangeSelectAssignedUsers = (users) => {
    this.setState({
      nextUserList: users,
    });
  };
  render() {
    const { users } = this.props;
    return (
      <Modal isOpen={this.props.modal} toggle={this.props.toggleModal}>
        <ModalHeader toggle={this.props.toggleModal}>EDIT Ticket</ModalHeader>
        <ModalBody>
          <Form onSubmit={this.handleSave}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="name"
                name="name"
                id="name"
                value={this.state.name}
                onChange={this.handleChange}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="textarea"
                name="description"
                id="textarea"
                value={this.state.description}
                onChange={this.handleChange}
              />
            </FormGroup>
            <SelectMultiProjects
              users={users}
              userList={this.state.userList}
              handleChange={this.handleChangeSelectAssignedUsers}
            />
            <FormGroup>
              <Button color="secondary">Cancel</Button>
              <Button onClick={this.handleSave} color="success">
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
