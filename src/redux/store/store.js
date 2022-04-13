import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import cuidadoresReducer from '../reducers/cuidadoresReducer';

const store = createStore(
	cuidadoresReducer,
	composeWithDevTools(applyMiddleware(thunk))
);
//buiefwui

export default store;
