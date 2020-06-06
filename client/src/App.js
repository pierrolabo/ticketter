import React, { Component } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import configureStore, { history } from './configureStore';
import { loadUser } from './actions/authActions';

import { Provider } from 'react-redux';

import Routes from './routes';
//import { loadUser } from './actions/authActions';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

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

export default App;
