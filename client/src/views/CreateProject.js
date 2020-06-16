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

import { addProject } from '../actions/projectActions';

class CreateProject extends Component {
  state = {
    name: '',
    description: '',
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = () => {
    const { name, description } = this.state;
    const newProject = { name, description };

    this.props.addProject(newProject);
  };
  render() {
    return (
      <Container>
        <Card>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for='name'>name</Label>
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
              <Button onClick={this.handleSubmit} color='success'>
                Save
              </Button>
            </FormGroup>
          </Form>
        </Card>
      </Container>
    );
  }
}
export default connect(null, { addProject })(CreateProject);