import React, { Component } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import asyncComponent from '../utils/asyncComponent';
const Login = asyncComponent(() => import("../pages/login/index.jsx"));
const Profile = asyncComponent(() => import("../pages/profile/index.jsx"));
const Forget = asyncComponent(() => import("../pages/forget/index.jsx"));
const Info = asyncComponent(() => import("../pages/info/index.jsx"));
const Balance = asyncComponent(() => import("../pages/balance/index.jsx"));
const SetUser = asyncComponent(() => import("../pages/set_user/index.jsx"));
const Hbhistory = asyncComponent(() => import("../pages/hbHistory/index"));
const Download = asyncComponent(() => import("../pages/download/index.jsx"));
const Search = asyncComponent(() => import("../pages/search/index.jsx"));
const Msite = asyncComponent(() => import("../pages/msite/index.jsx"));
const Shop = asyncComponent(() => import("../pages/shop/index.jsx"));
const Order = asyncComponent(() => import("../pages/order/index.jsx"));
const Food = asyncComponent(() => import("../pages/food/index.jsx"))
const Home = asyncComponent (()=>import("../pages/home/index.jsx"))
export default class RouterConfig extends Component {
    render() {
        return (<HashRouter >
            <Switch>
                <Route path="/food" component={Food} />
                <Route path="/home" component={Home} />
                <Route path="/msite" component={Msite} />
                <Route path="/order" component={Order} />
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