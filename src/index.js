import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import { compose,createStore, applyMiddleware } from 'redux';
import {persistStore, autoRehydrate} from 'redux-persist'

import { Provider } from 'react-redux';
import reducer from './reducers';
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
const middleware = [ thunk ];
// middleware.push(createLogger());
const store = createStore(reducer,compose(applyMiddleware(...middleware),autoRehydrate()))

// begin periodically persisting the store
// persistStore(store)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
