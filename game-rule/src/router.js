import React, { Component } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from './pages/home'
export default class RouteConfig extends Component {
    render(){
        return(
            <HashRouter>
                <Switch>
                    <Route path='/' exact component={Home}/>
                    <Redirect to="/" />
                </Switch>
            </HashRouter>
        )
    }
}