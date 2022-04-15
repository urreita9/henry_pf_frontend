import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import cuidadoresReducer from '../reducer/cuidadoresReducer';

const store = createStore(
	cuidadoresReducer,
	composeWithDevTools(applyMiddleware(thunk))
);

export default store;
