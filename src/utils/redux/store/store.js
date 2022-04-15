import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import cuidadoresReducer from '../reducers/cuidadoresReducer';
import userReducer from '../reducers/userReducer';

const reducers = combineReducers({ cuidadoresReducer, userReducer });

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

export default store;
