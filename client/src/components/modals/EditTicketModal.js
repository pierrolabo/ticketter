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
import { updateTicket } from '../../actions/ticketActions';
import { SelectSingleProject } from '../Select/SelectSingleProject';

const STATUS = [
  { value: 'NEW', label: 'NEW' },
  { value: 'PROGRESS', label: 'PROGRESS' },
  { value: 'URGENT', label: 'URGENT' },
  { value: 'UNRESOLVED', label: 'UNRESOLVED' },
];
const createOptionsUsers = (users) => {
  let filteredUsers = users.map((user) => {
    return {
      value: user._id,
      label: `${user.name} ${user.lastname} | ${user.role}`,
    };
  });
  return [{ value: '', label: 'UNASSIGNED' }, ...filteredUsers];
};

const createDefaultUser = (users, assigned_to) => {
  //  If ticket isnt assigned to anyone we send the default value for the select
  if (assigned_to === '') {
    return [{ value: '', label: 'UNASSIGNED' }];
  }

  let defaultUser = users.filter((user) => user._id === assigned_to)[0];
  return [
    {
      value: defaultUser._id,
      label: `${defaultUser.name} ${defaultUser.lastname} | ${defaultUser.role}`,
    },
  ];
};
const createDefaultStatus = (status) => [{ value: status, label: status }];

class EditTicketModal extends Component {
  static propTypes = {
    updateTicket: PropTypes.func.isRequired,
  };

  state = {
    title: '',
    description: '',
    status: '',
    _id: '',
    assigned_to: null,
    projectID: '',
    nextProjID: null,
  };
  componentWillMount() {
    //this.props.getUsers();
    const {
      title,
      description,
      status,
      _id,
      assigned_to,
      projectID,
    } = this.props.editTicket;
    this.setState({ title, description, status, _id, assigned_to, projectID });
  }
  handleSubmitModal = () => {};
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleChangeSelectStatus = (e) => {
    this.setState({ status: e.value });
  };
  handleChangeSelectAssignedTo = (e) => {
    this.setState({ assigned_to: e.value });
  };
  handleChangeSelectAssignedProject = (e) => {
    //  TODO
    //  if user is not part of the next project
    //  Assign ticket to undefined
    this.setState({ nextProjID: e.value });
  };
  handleSave = () => {
    const {
      title,
      description,
      status,
      _id,
      assigned_to,
      projectID,
      nextProjID,
    } = this.state;
    const newTicket = {
      id: _id,
      title,
      description,
      status,
      assigned_to,
      projectID,
      nextProjID,
    };
    this.props.updateTicket(newTicket);

    //  Close modal
    this.props.toggleModal();
  };
  render() {
    const users = this.props.users;
    const projects = this.props.projects;
    return (
      <Modal isOpen={this.props.modal} toggle={this.props.toggleModal}>
        <ModalHeader toggle={this.props.toggleModal}>EDIT Ticket</ModalHeader>
        <ModalBody>
          <Form onSubmit={this.handleSubmitModal}>
            <FormGroup>
              <Label for='title'>Title</Label>
              <Input
                type='title'
                name='title'
                id='title'
                value={this.state.title}
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
              <Label for='status'>Ticket Status</Label>
              <Select
                name='statusSelect'
                onChange={this.handleChangeSelectStatus}
                options={STATUS}
                defaultValue={createDefaultStatus(this.state.status)}
              />
            </FormGroup>
            <SelectSingleProject
              projects={projects}
              id={this.state.projectID}
              handleChange={this.handleChangeSelectAssignedProject}
            />
            {users.length > 0 && this.state.assigned_to != null ? (
              <FormGroup>
                <Label for='assigned'>Assigned to</Label>
                <Select
                  name='assignedSelect'
                  onChange={this.handleChangeSelectAssignedTo}
                  options={createOptionsUsers(users)}
                  defaultValue={createDefaultUser(
                    users,
                    this.state.assigned_to
                  )}
                />
              </FormGroup>
            ) : (
              ''
            )}

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

export default connect(null, { updateTicket })(EditTicketModal);
