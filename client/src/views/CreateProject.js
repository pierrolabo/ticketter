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
} from 'reactstrap';
import { connect } from 'react-redux';
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
    const created_by = this.props.auth.user.id;
    const newProject = { name, description, created_by };

    this.props.addProject(newProject);
  };
  render() {
    return (
      <Container>
        <Card>
          <CardHeader>Create a new project</CardHeader>
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
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { addProject })(CreateProject);
