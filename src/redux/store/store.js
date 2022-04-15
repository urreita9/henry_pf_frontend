import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
<<<<<<< HEAD
<<<<<<< HEAD
import cuidadoresReducer from '../reducers/cuidadoresReducer';

const store = createStore(
  cuidadoresReducer,
  composeWithDevTools(applyMiddleware(thunk))
=======
import cuidadoresReducer from '../reducer/cuidadoresReducer';

const store = createStore(
	cuidadoresReducer,
	composeWithDevTools(applyMiddleware(thunk))
>>>>>>> cuidadorFormFrontEnd
=======
import cuidadoresReducer from '../reducer/cuidadoresReducer';

const store = createStore(
	cuidadoresReducer,
	composeWithDevTools(applyMiddleware(thunk))
>>>>>>> profileView
);

export default store;
