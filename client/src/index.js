import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//  Redux && stuff
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { Provider } from 'react-redux';
import configureStore, { history } from './configureStore';
import { AppContainer } from 'react-hot-loader';

const store = configureStore({});
let persistor = persistStore(store);

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

// Hot reloading
if (module.hot) {
  // Reload components
  module.hot.accept('./App', () => {
    render();
  });
}
