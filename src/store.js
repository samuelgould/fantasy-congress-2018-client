import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { loadAuthToken } from './local-storage';
import { reducer as formReducer } from 'redux-form';
import { reducer as candidatesReducer } from './reducers/candidates';
import { reducer as userReducer } from './reducers/user';
import { reducer as authReducer } from './reducers/auth';
import { setAuthToken, refreshAuthToken } from './actions/auth';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    form: formReducer,
    auth: authReducer,
    candidates: candidatesReducer,
    user: userReducer
  }),
  composeEnhancer(applyMiddleware(thunk))
);

const authToken = loadAuthToken();
if (authToken) {
    const token = authToken;
    store.dispatch(setAuthToken(token));
    store.dispatch(refreshAuthToken());
}

export default store;