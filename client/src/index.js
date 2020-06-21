import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

//  Redux && stuff
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { history } from './configureStore';
import { AppContainer } from 'react-hot-loader';
import { store, persistor } from './configureStore';

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App history={history} />
        </PersistGate>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
};

render();
