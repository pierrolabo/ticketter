import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

//Redux utilities
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions.js';

class Register extends Component {
  state = {
    name: '',
    lastname: '',
    password: '',
    msg: null,
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };
  componentDidUpdate(prevProps, nextProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      //check for register error
      if (error.id === 'REGISTER_FAIL') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();

    const { name, lastname, email, password } = this.state;

    //  Create user object
    const newUser = {
      name,
      lastname,
      email,
      password,
    };

    //  Attempt to register
    this.props.register(newUser);
  };

  render() {
    return (
      <div className='register'>
        <h1>msg: {this.state.msg}</h1>
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Label for='name'>Name</Label>
            <Input
              type='text'
              name='name'
              id='name'
              placeholder='Name'
              className='mb-3'
              onChange={this.onChange}
            />
            <Label for='lastname'>Lastname</Label>
            <Input
              type='text'
              name='lastname'
              id='lastname'
              placeholder='lastname'
              className='mb-3'
              onChange={this.onChange}
            />
            <Label for='email'>Email</Label>
            <Input
              type='email'
              name='email'
              id='email'
              placeholder='Email'
              className='mb-3'
              onChange={this.onChange}
            />
            <Label for='Password'>Password</Label>
            <Input
              type='password'
              name='password'
              id='password'
              placeholder='Password'
              className='mb-3'
              onChange={this.onChange}
            />
            <Button color='dark' block>
              Register
            </Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});
export default connect(mapStateToProps, { register, clearErrors })(Register);
