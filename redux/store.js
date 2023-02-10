import {
    legacy_createStore,
    applyMiddleware,
    compose,
    combineReducers

} from 'redux';

import thunk from 'redux-thunk';
import { authReducer } from './auth/reducer';
import { taskReducer } from './task/reducer';

const rootReducer = combineReducers({
    auth:authReducer,
    task:taskReducer
});

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

export const store = legacy_createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));