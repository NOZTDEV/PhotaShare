// import { createStore, applyMiddleware, compose } from "redux";
// import thunk from "redux-thunk";
// import rootReducer from '../reducer/reducer';

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// export const store = createStore(
//     rootReducer,
//     composeEnhancers(applyMiddleware(thunk))
//   )

import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from '../reducer/reducer';

export const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);