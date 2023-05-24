import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from './reducers/reducer';

const dev = compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const prod = compose(applyMiddleware(thunk));

const store = createStore(
    rootReducer,
    process.env.REACT_APP_REDUX_ENV === 'PRODUCTION' ? prod : dev
);

export default store;
