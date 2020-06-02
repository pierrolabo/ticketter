import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import configureStore, { history } from './configureStore';
import Register from './components/auth/Register';
import { Provider } from 'react-redux';

import routes from './routes';
//import { loadUser } from './actions/authActions';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const store = configureStore({});
class App extends Component {
  componentDidMount() {
    //store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>{routes}</ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
