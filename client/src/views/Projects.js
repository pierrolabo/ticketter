import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Container } from 'reactstrap';

//import TicektList from '../components/TicketList/TicketList';
//import { getProjects } from '../actions/projectActions';
//import TicketList from '../components/TicketList/TicketList';

import ProjectList from '../components/ProjectList/ProjectList';

export class Projects extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
  };
  render() {
    return (
      <Container className="projects-container mt-5">
        <ProjectList />
      </Container>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, null)(Projects);
