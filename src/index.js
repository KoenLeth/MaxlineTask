import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import { createStore} from 'redux';
import reducer from './reducer';
import MainPage from './MainPage';
import { combineReducers } from 'redux'


const reducers = combineReducers({
  reducer
})

const store = createStore(
    reducers,
    );

ReactDOM.render(
    <Provider store={store}>
        <MainPage/>
    </Provider>, 
    document.getElementById('root'));

serviceWorker.unregister();

