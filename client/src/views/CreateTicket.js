import React, { Component } from 'react';
import {
  Container,
  Card,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  CardHeader,
  Alert,
} from 'reactstrap';
import Select from 'react-select';

//  Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTickets } from '../actions/ticketActions';
import { getProjects } from '../actions/projectActions';
import { createTicket } from '../actions/ticketActions';
import { getUsers } from '../actions/userActions';
import { history } from '../configureStore';
import { clearErrors } from '../actions/errorActions';

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
    projectID: null,
    assigned_to: '',
    msg: null,
  };
  static propTypes = {
    auth: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    getTickets: PropTypes.func.isRequired,
    createTicket: PropTypes.func.isRequired,
    getProjects: PropTypes.func.isRequired,
    getUsers: PropTypes.func.isRequired,
    error: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired,
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
      let defaultProject = this.props.project.projects.filter(
        (project) => project.name === 'GENERAL'
      );
      //  if there is a GENERAL Project
      if (defaultProject.length > 0) {
        return [
          { value: defaultProject[0]._id, label: defaultProject[0].name },
        ];
      } else {
        return [{ value: '', label: 'GENERAL' }];
      }
    }
  };
  componentWillMount() {
    this.props.getUsers();
    this.props.getProjects();
    this.props.getTickets();
  }
  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      console.log('error in createticket: ', error);
      //check for register error
      if (error.id === 'CREATE_TICKET_FAIL') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
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
    this.setState({ projectID: e.value });
  };
  handleCancel = () => {
    history.push('/tickets');
  };
  handleSave = () => {
    const { title, description, status, assigned_to, projectID } = this.state;
    const created_by = this.props.auth.user._id;
    const newTicket = {
      title,
      description,
      status,
      created_by,
      assigned_to,
      projectID,
    };
    console.log('new ticket: ', newTicket);
    this.props.createTicket(newTicket);
  };
  render() {
    const { projects } = this.props.project;
    const { users } = this.props.user;
    const role = this.props.auth.user.role;
    return (
      <Container className="createticket-container mt-5">
        <Card>
          <CardHeader className="text-center">Create a new ticket</CardHeader>
          {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : ''}
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                type="title"
                name="title"
                id="title"
                placeholder="What is the problem ?"
                value={this.state.title}
                onChange={this.handleChange}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="textarea"
                name="description"
                placeholder="Describe the problem..."
                value={this.state.description}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="status">Ticket Status</Label>
              <Select
                name="statusSelect"
                onChange={this.handleChangeSelectStatus}
                options={STATUS_TICKET}
                defaultValue={DEFAULT_STATUS_TICKET}
              />
            </FormGroup>
            <FormGroup>
              <Label for="assigned">Assigned Project</Label>
              <Select
                name="assignedProject"
                onChange={this.handleChangeSelectAssignedProject}
                options={this.createOptionsProjects(projects)}
                defaultValue={this.createDefaultProject()}
              />
            </FormGroup>
            {role !== 'USER' ? (
              <FormGroup>
                <Label for="assigned">Assigned to</Label>
                <Select
                  name="assignedSelect"
                  onChange={this.handleChangeSelectAssignedTo}
                  options={this.createOptionsUsers(users)}
                  defaultValue={DEFAULT_USER_ASSIGNED}
                />
              </FormGroup>
            ) : (
              ''
            )}

            <FormGroup className="formgroup-buttons-cancel-save">
              <Button color="danger" onClick={this.handleCancel}>
                Cancel
              </Button>
              <Button onClick={this.handleSave} color="success">
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
  error: state.error,
});
export default connect(mapStateToProps, {
  getTickets,
  getProjects,
  getUsers,
  createTicket,
  clearErrors,
})(CreateTicket);
