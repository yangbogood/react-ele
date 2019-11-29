import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';


import RouterConfig from './router/index.jsx'
import store from './store/index.js'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import * as serviceWorker from './serviceWorker';

import './config/rem';
import './style/base.scss'
import 'antd-mobile/dist/antd-mobile.css';

const render = Component => {
        console.info(Component)
        ReactDOM.render( <
            Provider store = { store } >
            <
            AppContainer >
            <
            Component / >
            <
            /AppContainer> <
            /Provider>, document.getElementById('root'))
        };


        render(RouterConfig);

        serviceWorker.unregister();