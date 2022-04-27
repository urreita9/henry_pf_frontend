import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import cuidadoresReducer from '../reducers/cuidadoresReducer';
import operationsReducer from '../reducers/operationsReducer';
import userReducer from '../reducers/userReducer';
import themeModeReducer from '../reducers/themeModeReducer';
import adminReducer from '../reducers/adminReducer';

const reducers = combineReducers({
    cuidadoresReducer,
    userReducer,
    themeModeReducer,
    operationsReducer,
    adminReducer,
});

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

export default store;
