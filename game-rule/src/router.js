import React, { Component } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import Niuniu from './pages/niuniu'
import TwentyOne from './pages/twentyOne'
export default class RouteConfig extends Component {
    render(){
        return(
            <HashRouter>
                <Switch>
                    <Route path='/' exact component={Niuniu}/>
                    <Route path='/twentyOne' exact component={TwentyOne}/>
                    <Redirect to="/" />
                </Switch>
            </HashRouter>
        )
    }
}