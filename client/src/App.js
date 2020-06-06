import React, { Component } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import configureStore, { history } from './configureStore';
import { loadUser } from './actions/authActions';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';

import Routes from './routes';
//import { loadUser } from './actions/authActions';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = ({ history }) => (
  <ConnectedRouter history={history}>
    <div>
      <Routes />
    </div>
  </ConnectedRouter>
);
export default hot(module)(App);
/*
const store = configureStore({});
class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>
      </Provider>
    );
  }
}
App.propTypes = {
  history: PropTypes.object,
};
export default App;
*/
