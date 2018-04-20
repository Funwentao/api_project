import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Home from '../component/Home';

import { Provider } from 'react-redux'
import configureStore from '../store/configureStore.js'
import {CONFIG} from "../constants/conifg";

const {loginUrl} = CONFIG;

let store = configureStore();

//ReactDOM.render(<Home/>,document.getElementById("app"));
!localStorage.getItem("username")&&(location.href = loginUrl);
ReactDOM.render(
    <Provider store={store}>
        <Home/>
    </Provider>,
    document.getElementById("app")
);