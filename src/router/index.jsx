import React, { Component } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from '../pages/login/index.jsx';
import Profile from '../pages/profile/index.jsx';
import Forget from '../pages/forget/index.jsx';
import Info from '../pages/info/index.jsx';
import Balance from '../pages/balance/index.jsx';
import SetUser from '../pages/set_user/index.jsx';
import Hbhistory from '../pages/hbHistory/index';
import Download from '../pages/download/index.jsx';
import Search from "../pages/search/index.jsx";
import Msite from "../pages/msite/index.jsx";
import Shop from '../pages/shop/index.jsx'
export default class RouterConfig extends Component {
    render() {
        return (<HashRouter >
            <Switch>
                <Route path="/msite" component={Msite} />
                <Route path="/shop/:id" component={Shop} />
                <Route path="/search" component={Search} />
                <Route path='/login' component={Login} />
                <Route path='/profile' component={Profile} />
                <Route path='/forget' component={Forget} />
                <Route path='/setUser' component={SetUser} />
                <Route path='/info' component={Info} />
                <Route path='/balance' exact component={Balance} />
                <Route path='/download' exact component={Download} />
                <Route path='/balance/hbHistory' component={Hbhistory} />
                <Redirect exact from='/' to='/profile' />
            </Switch>
        </HashRouter>
        )
    }
}