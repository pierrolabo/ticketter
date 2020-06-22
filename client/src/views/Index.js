import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadUser } from '../actions/authActions';
//  Bootstrap Elm
import { Jumbotron, Container } from 'reactstrap';
class Index extends Component {
  componentDidMount() {
    this.props.loadUser();
  }
  render() {
    return (
      <Container className='dashboard-container'>
        <Jumbotron fluid>
          <Container fluid>
            <h1 className='display-3'>Ticketter</h1>
            <p className='lead'>The simplest ticket manager for your team :)</p>
          </Container>
        </Jumbotron>
        <h2>Functionnalities</h2>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { loadUser })(Index);
