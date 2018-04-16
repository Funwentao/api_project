import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Home from '../component/Home';

import { Provider } from 'react-redux'
import configureStore from '../store/configureStore.js'

let store = configureStore();

//ReactDOM.render(<Home/>,document.getElementById("app"));

ReactDOM.render(
    <Provider store={store}>
        <Home/>
    </Provider>,
    document.getElementById("app")
);