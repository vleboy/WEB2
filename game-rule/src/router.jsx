import React, { Component } from "react";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import Niuniu from "./pages/niuniu";
import TwentyOne from "./pages/twentyOne";
import Home from "./pages/index";
export default class RouteConfig extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/niuniu" exact component={Niuniu} />
          <Route path="/twentyOne" exact component={TwentyOne} />
          <Redirect to="/" />
        </Switch>
      </HashRouter>
    );
  }
}
