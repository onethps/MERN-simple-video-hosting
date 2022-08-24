import App from 'App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { persistor, store } from 'redux/store/store';
import { PersistGate } from 'redux-persist/integration/react';

// eslint-disable-next-line no-undef
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <PersistGate loading={null} persistor={persistor}>
    <Provider store={store}>
      <App />
    </Provider>
  </PersistGate>,
);
