import React, { Component } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Col,
  Row,
  Alert,
  Card,
  CardHeader,
  CardBody,
} from 'reactstrap';

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
    const { error } = this.props;
    if (error !== prevProps.error) {
      //check for register error
      if (error.id === 'LOGIN_FAIL') {
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
  handleLoginDemo = (e) => {
    switch (e.target.id) {
      case 'ADMIN':
        this.props.login({ email: 'joseph@gmail.com', password: 'joseph' });
        break;
      case 'PROJECT_MANAGER':
        this.props.login({ email: 'pg@gmail.com', password: 'pg' });
        break;

      case 'DEVELOPER':
        this.props.login({
          email: 'developer@gmail.com',
          password: 'developer',
        });
        break;

      case 'CLIENT':
        this.props.login({ email: 'client@gmail.com', password: 'client' });
        break;
      default:
        break;
    }
  };
  render() {
    return (
      <Row className="login-row">
        <Col xs="5" md="5" xl="3" className="login-container">
          <Container>
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : (
              ''
            )}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="mb-3"
                  onChange={this.onChange}
                />
                <Label for="Password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="mb-3"
                  autocomplete="on"
                  onChange={this.onChange}
                />
                <Button color="primary" block>
                  Login
                </Button>
              </FormGroup>
            </Form>
          </Container>
        </Col>
        <Col xs="4" md="3" xl="2" className="login-as-container">
          <Card className="login-as">
            <CardHeader>Login as</CardHeader>
            <CardBody className="login-as-container-login-buttons">
              <Button onClick={this.handleLoginDemo} id="ADMIN">
                admin
              </Button>
              <Button onClick={this.handleLoginDemo} id="PROJECT_MANAGER">
                Project Manager
              </Button>
              <Button onClick={this.handleLoginDemo} id="DEVELOPER">
                Developer
              </Button>
              <Button onClick={this.handleLoginDemo} id="CLIENT">
                Client
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});
export default connect(mapStateToProps, { login, clearErrors })(Login);
