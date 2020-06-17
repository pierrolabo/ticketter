import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import DashboardAdmin from '../components/admin/DashboardAdmin';

class Home extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
  };

  render() {
    const { role } = this.props.auth;
    return (
      <div className='home'>
        {role === 'ADMIN' ? <DashboardAdmin /> : '<h1>lol</h1>'}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, null)(Home);
