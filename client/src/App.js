import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { hot } from 'react-hot-loader';
import Routes from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = ({ history }) => (
  <ConnectedRouter history={history}>
    <Routes />
  </ConnectedRouter>
);

export default hot(module)(App);
