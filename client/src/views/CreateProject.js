import React, { Component } from 'react';
import {
  Container,
  Card,
  CardHeader,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
} from 'reactstrap';

//  Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addProject } from '../actions/projectActions';

import { history } from '../configureStore';
class CreateProject extends Component {
  state = {
    name: '',
    description: '',
    msg: null,
  };
  static propTypes = {
    error: PropTypes.object.isRequired,
  };
  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      console.log('error in createticket: ', error);
      //check for register error
      if (error.id === 'ADD_PROJECT_FAIL') {
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
  handleCancel = () => {
    history.push('/projects');
  };
  handleSubmit = () => {
    const { name, description } = this.state;
    const created_by = this.props.auth.user._id;
    const newProject = { name, description, created_by };
    this.props.addProject(newProject);
  };
  render() {
    return (
      <Container className="createproject-container mt-5">
        <Card>
          <CardHeader className="text-center">Create a new project</CardHeader>
          {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : ''}
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="name">name</Label>
              <Input
                type="name"
                name="name"
                id="name"
                value={this.state.name}
                onChange={this.handleChange}
                placeholder="Project name..."
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
                placeholder="Describe the project.."
              />
            </FormGroup>
            <FormGroup className="formgroup-buttons-cancel-save">
              <Button color="danger" onClick={this.handleCancel}>
                Cancel
              </Button>
              <Button onClick={this.handleSubmit} color="success">
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
  error: state.error,
});
export default connect(mapStateToProps, { addProject })(CreateProject);
