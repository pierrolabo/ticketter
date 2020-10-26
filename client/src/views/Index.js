import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadUser } from '../actions/authActions';
//  Bootstrap Elm
import { Container } from 'reactstrap';
import JumbotronLanding from '../components/jumbotron/jumbotron';
import Features from '../components/features/features';

class Index extends Component {
  componentDidMount() {
    this.props.loadUser();
  }
  render() {
    return (
      <div className="index__container">
        <JumbotronLanding />
        <Features />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { loadUser })(Index);
