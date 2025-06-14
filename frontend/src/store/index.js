import { legacy_createStore, compose, combineReducers, applyMiddleware } from 'redux';

import { thunk } from 'redux-thunk'; 
import { authReducer } from './reducers/authReducer';
import {messengerReducer} from './reducers/messengerReducer';

const rootReducer = combineReducers({
  auth: authReducer,
     messenger : messengerReducer
});

const middleware = [thunk]; 

const store = legacy_createStore(
  rootReducer,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )
);

export default store;
