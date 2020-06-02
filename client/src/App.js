import React, { Component } from 'react';
import { Container } from 'reactstrap';

import Register from './components/auth/Register';
import { Provider } from 'react-redux';
import store from './store';
//import { loadUser } from './actions/authActions';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  componentDidMount() {
    //store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <div className='App'>
          <Container>
            <Register />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
