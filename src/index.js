import '../src/style.css';
import '../src/styles/scss/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { routerReducer } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import * as reducers from './app/reducers';
import * as actions from './app/actions';
reducers.routing = routerReducer;

import App from './app/components/App';

const store = createStore(combineReducers(reducers), applyMiddleware(thunkMiddleware));

const run = () => {
    ReactDOM.render((<Provider store={store}>
            <App />
        </Provider>), document.getElementById('root'));
};

const init = () => {
    run();
    store.subscribe(run);
};

init();
