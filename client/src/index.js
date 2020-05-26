import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from "redux";
import { Provider } from 'react-redux';
import rootReducer from "./redux/reducers/index";
import { API_URL, SOCKET_URL } from "./constants";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { PersistGate } from 'redux-persist/integration/react';
import { purgeStoredState } from 'redux-persist'
import { css } from "@emotion/core";
import Loader from "react-spinners/RingLoader";
import socket from './socket.js';

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  //persistedReducer,
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const persistor = persistStore(store);

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

// store.getState();
// Check current room created time
// if more than 12 hours, then persistor.purge()
// check if room still active, if it is we're good
// if not, then persistor.purge()
// If room active, make sure to connect to socket server again!


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <PersistGate
        loading={
          <Loader
            css={override}
            size={50}
            color={"#6377f7"}
          />
        }
        persistor={persistor}> */}
        <App />
      {/* </PersistGate> */}
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
