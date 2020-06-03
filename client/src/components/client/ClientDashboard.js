import React, { Component, Fragment } from 'react';
import { NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//  Bootstrap Elm
import { Jumbotron, Container } from 'reactstrap';
export class DashboardAdmin extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
  };
  render() {
    const { isAuthenticated, role, user } = this.props.auth;

    return (
      <Jumbotron fluid>
        <Container fluid>
          <h1 className='display-3'>Admin panel</h1>
          <p className='lead'>Admin panel</p>
        </Container>
      </Jumbotron>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, null)(DashboardAdmin);
