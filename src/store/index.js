import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import thunk from 'redux-thunk';

import pipeline from './pipeline';

export default createStore(pipeline, composeWithDevTools(applyMiddleware(thunk)));
