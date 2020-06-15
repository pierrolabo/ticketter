import React, { Component } from 'react';
import {
  Container,
  Card,
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
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTickets } from '../actions/ticketActions';
import { getProjects } from '../actions/projectActions';
import { getUsers } from '../actions/userActions';
import Select from 'react-select';

const STATUS_TICKET = [
  { value: 'NEW', label: 'NEW' },
  { value: 'URGENT', label: 'URGENT' },
  { value: 'PROGRESS', label: 'PROGRESS' },
  { value: 'UNRESOLVED', label: 'UNRESOLVED' },
];
const DEFAULT_STATUS_TICKET = [{ value: 'NEW', label: 'NEW' }];
const DEFAULT_USER_ASSIGNED = [{ value: 'NEW', label: 'UNASSIGNED' }];
class CreateTicket extends Component {
  state = {
    title: '',
    description: '',
    status: '',
    projectID: '',
    assigned_to: '',
  };
  static propTypes = {
    auth: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    getTickets: PropTypes.func.isRequired,
    getProjects: PropTypes.func.isRequired,
    getUsers: PropTypes.func.isRequired,
  };
  createOptionsUsers = () => {
    let filteredUsers = this.props.user.users.map((user) => {
      return {
        value: user._id,
        label: `${user.name} ${user.lastname} | ${user.role}`,
      };
    });
    return [{ value: '', label: 'UNASSIGNED' }, ...filteredUsers];
  };
  createOptionsProjects = () => {
    return this.props.project.projects.map((project) => {
      return {
        value: project._id,
        label: project.name,
      };
    });
  };
  createDefaultProject = (defaultProject) => {
    if (!defaultProject) {
      //  We return the project general
      let defaultProject = this.props.project.projects.filter(
        (project) => project.name === 'GENERAL'
      )[0];
      return [{ value: defaultProject._id, label: defaultProject.name }];
    }
  };
  componentWillMount() {
    this.props.getUsers();
    this.props.getProjects();
    this.props.getTickets();
  }
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
    this.setState({ projectID: e.value });
  };
  handleSave = () => {
    console.log('save: ', this.state);
  };
  render() {
    const { projects } = this.props.project;
    const { users } = this.props.user;
    return (
      <Container>
        <Card>
          <Form onSubmit={this.handleSubmit}>
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
                options={STATUS_TICKET}
                defaultValue={DEFAULT_STATUS_TICKET}
              />
            </FormGroup>
            <FormGroup>
              <Label for='assigned'>Assigned Project</Label>
              <Select
                name='assignedProject'
                onChange={this.handleChangeSelectAssignedProject}
                options={this.createOptionsProjects(projects)}
                defaultValue={this.createDefaultProject()}
              />
            </FormGroup>
            <FormGroup>
              <Label for='assigned'>Assigned to</Label>
              <Select
                name='assignedSelect'
                onChange={this.handleChangeSelectAssignedTo}
                options={this.createOptionsUsers(users)}
                defaultValue={DEFAULT_USER_ASSIGNED}
              />
            </FormGroup>
            <FormGroup>
              <Button color='secondary'>Cancel</Button>
              <Button onClick={this.handleSave} color='success'>
                Save
              </Button>
            </FormGroup>
          </Form>
        </Card>
      </Container>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  isLoading: state.ticket.isLoading,
  ticket: state.ticket,
  project: state.project,
  user: state.user,
});
export default connect(mapStateToProps, { getTickets, getProjects, getUsers })(
  CreateTicket
);
