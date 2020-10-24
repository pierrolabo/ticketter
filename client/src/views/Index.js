import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadUser } from '../actions/authActions';
//  Bootstrap Elm
import { Jumbotron, Container } from 'reactstrap';
import JumbotronLanding from '../components/jumbotron/index';

class Index extends Component {
  componentDidMount() {
    this.props.loadUser();
  }
  render() {
    return (
      <div className="jumbotron-container">
        <JumbotronLanding />
        <h2 className="text-center">
          Remote DB is slow, think to refresh if you have no data
        </h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { loadUser })(Index);
