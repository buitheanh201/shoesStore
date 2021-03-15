import RootReducer from './../reducers';
import thunk from 'redux-thunk';
import { createStore,applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(RootReducer,composeWithDevTools(applyMiddleware(thunk)));

export default store;