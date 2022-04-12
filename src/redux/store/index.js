import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import caretakerReducer from '../reducer';

const store = createStore(
  caretakerReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
