import React, { Component, Fragment } from 'react';
import { NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Jumbotron, Container, Nav } from 'reactstrap';
import Sidebar from '../sidebar/SideBar';
export class DashboardAdmin extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
  };
  render() {
    const { isAuthenticated, role, user } = this.props.auth;

    return (
      <div className='container-flex'>
        <div className='container-flex-column'>
          <Container>
            <Nav className='col-md-2 d-none d-md-block bg-light sidebar'></Nav>
            <Jumbotron fluid>
              <Container fluid>
                <h1 className='display-3'>Admin panel</h1>
                <p className='lead'>Admin panel</p>
              </Container>
            </Jumbotron>
          </Container>
          <Container>
            <Nav className='col-md-2 d-none d-md-block bg-light sidebar'></Nav>
            <Jumbotron fluid>
              <Container fluid>
                <h1 className='display-3'>Admin panel</h1>
                <p className='lead'>Admin panel</p>
              </Container>
            </Jumbotron>
          </Container>
          <Container>
            <Nav className='col-md-2 d-none d-md-block bg-light sidebar'></Nav>
            <Jumbotron fluid>
              <Container fluid>
                <h1 className='display-3'>Admin panel</h1>
                <p className='lead'>Admin panel</p>
              </Container>
            </Jumbotron>
          </Container>
          <Container>
            <Nav className='col-md-2 d-none d-md-block bg-light sidebar'></Nav>
            <Jumbotron fluid>
              <Container fluid>
                <h1 className='display-3'>Admin panel</h1>
                <p className='lead'>Admin panel</p>
              </Container>
            </Jumbotron>
          </Container>
          <Container>
            <Nav className='col-md-2 d-none d-md-block bg-light sidebar'></Nav>
            <Jumbotron fluid>
              <Container fluid>
                <h1 className='display-3'>Admin panel</h1>
                <p className='lead'>Admin panel</p>
              </Container>
            </Jumbotron>
          </Container>
          <Container>
            <Nav className='col-md-2 d-none d-md-block bg-light sidebar'></Nav>
            <Jumbotron fluid>
              <Container fluid>
                <h1 className='display-3'>Admin panel</h1>
                <p className='lead'>Admin panel</p>
              </Container>
            </Jumbotron>
          </Container>
          <Container>
            <Nav className='col-md-2 d-none d-md-block bg-light sidebar'></Nav>
            <Jumbotron fluid>
              <Container fluid>
                <h1 className='display-3'>Admin panel</h1>
                <p className='lead'>Admin panel</p>
              </Container>
            </Jumbotron>
          </Container>
          <Container>
            <Nav className='col-md-2 d-none d-md-block bg-light sidebar'></Nav>
            <Jumbotron fluid>
              <Container fluid>
                <h1 className='display-3'>Admin panel</h1>
                <p className='lead'>Admin panel</p>
              </Container>
            </Jumbotron>
          </Container>
          <Container>
            <Nav className='col-md-2 d-none d-md-block bg-light sidebar'></Nav>
            <Jumbotron fluid>
              <Container fluid>
                <h1 className='display-3'>Admin panel</h1>
                <p className='lead'>Admin panel</p>
              </Container>
            </Jumbotron>
          </Container>
          <Container>
            <Nav className='col-md-2 d-none d-md-block bg-light sidebar'></Nav>
            <Jumbotron fluid>
              <Container fluid>
                <h1 className='display-3'>Admin panel</h1>
                <p className='lead'>Admin panel</p>
              </Container>
            </Jumbotron>
          </Container>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, null)(DashboardAdmin);
