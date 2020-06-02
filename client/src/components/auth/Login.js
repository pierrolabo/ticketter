import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

//Redux utilities
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions.js';

class Login extends Component {
  state = {
    name: '',
    surname: '',
    password: '',
    msg: null,
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
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
    const { email, password } = this.state;
    const user = {
      email,
      password,
    };

    //attempt to login
    this.props.login(user);
  };

  render() {
    return (
      <div className='Login'>
        <h1>msg: {this.state.msg}</h1>
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
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
              Login
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
export default connect(mapStateToProps, { login, clearErrors })(Login);
