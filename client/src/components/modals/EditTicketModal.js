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
  NavLink,
  Row,
  Col,
  Alert,
} from 'reactstrap';
import Select from 'react-select';
import { connect } from 'react-redux';
import { faMehRollingEyes } from '@fortawesome/free-solid-svg-icons';

import PropTypes from 'prop-types';
import { clearErrors } from '../../actions/errorActions';
import { getUsers } from '../../actions/userActions';
import { updateTicket } from '../../actions/ticketActions';
import { USER_LOADING } from '../../actions/types';

const STATUS = [
  { value: 'NEW', label: 'NEW' },
  { value: 'PROGRESS', label: 'PROGRESS' },
  { value: 'URGENT', label: 'URGENT' },
  { value: 'UNRESOLVED', label: 'UNRESOLVED' },
];
const createOptionsOrgs = (projects) => {
  console.log('creating options..');
  return projects.map((project) => {
    return {
      value: project.name,
      label: project.name,
    };
  });
};
const createOptionsUsers = (users) => {
  console.log('creating option users: ', users);
  let filteredUsers = users.map((user) => {
    return {
      value: user._id,
      label: `${user.name} ${user.lastname} | ${user.role}`,
    };
  });
  return [{ value: '', label: 'UNASSIGNED' }, ...filteredUsers];
};
const createDefaultUser = (users, assigned_to) => {
  if (assigned_to == '') {
    return [{ value: '', label: 'UNASSIGNED' }];
  }
  console.log('user: ', users, 'assignedto: ', assigned_to);
  let foundUser = users.map((user) => {
    console.log('pass: ', user._id, 'id: ', assigned_to);
    if (user._id === assigned_to) {
      return {
        value: user._id,
        label: `${user.name} ${user.lastname} | ${user.role}`,
      };
    }
  });
  if (foundUser.length == 0) {
    return [{ value: '', label: 'UNASSIGNED' }];
  }
  console.log(foundUser.length);
  return foundUser;
};
const createDefaultStatus = (status) => [{ value: status, label: status }];
class EditTicketModal extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    getUsers: PropTypes.func.isRequired,
    updateTicket: PropTypes.func.isRequired,
  };

  state = {
    title: '',
    description: '',
    status: '',
    _id: '',
    assigned_to: null,
    projectID: '',
    nextPropID: null,
  };
  componentDidMount() {
    const {
      title,
      description,
      status,
      _id,
      assigned_to,
      projectID,
    } = this.props.editTicket;
    this.setState({ title, description, status, _id, assigned_to, projectID });
    this.props.getUsers();
  }
  handleSubmitModal = () => {
    console.log('modal submited');
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleChangeSelectStatus = (e) => {
    console.log('handlechangeselectstatus: ', e);
    this.setState({ status: e.value });
  };
  handleChangeSelectAssignedTo = (e) => {
    console.log('handlechangeselectAssigned: ', e);
    this.setState({ assigned_to: e.value });
  };
  handleSave = () => {
    console.log('save clicked: ');
    const {
      title,
      description,
      status,
      _id,
      assigned_to,
      projectID,
      nextPropID,
    } = this.state;
    const newTicket = {
      id: _id,
      title,
      description,
      status,
      assigned_to,
      projectID,
      nextPropID,
    };
    console.log('handlesubmit: ', newTicket);
    this.props.updateTicket(newTicket);
  };
  render() {
    const { users } = this.props.user;

    return (
      <Modal isOpen={this.props.modal}>
        <ModalHeader>EDIT Ticket</ModalHeader>
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
            <FormGroup>
              <Label for='assigned'>Assigned to</Label>
              <Select
                name='assignedSelect'
                onChange={this.handleChangeSelectAssignedTo}
                options={createOptionsUsers(users)}
                defaultValue={createDefaultUser(users, this.state.assigned_to)}
              />
            </FormGroup>
            <FormGroup>
              <Button color='secondary'>Cancel</Button>
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
const mapStateToProps = (state) => ({
  user: state.user,
});
export default connect(mapStateToProps, { getUsers, updateTicket })(
  EditTicketModal
);
