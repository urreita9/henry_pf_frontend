import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
// import pokemonReducer from '../reducer/reducer';

const store = createStore(
	pokemonReducer,
	composeWithDevTools(applyMiddleware(thunk))
);

export default store;
