import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';

import pipeline from './pipeline';
import user from './user';

const rootReducer = combineReducers({ pipeline, user });

export default createStore(rootReducer, composeWithDevTools(applyMiddleware(promise, thunk)));
