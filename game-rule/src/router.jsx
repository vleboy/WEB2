import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './pages/index'
//bjl
import Classic from './pages/baijiale/classic'
import BaoZhuo from './pages/baijiale/baozhuo'
import Insurance from './pages/baijiale/insurance'
import Jinmi from './pages/baijiale/jinmi'
import Longbao from './pages/baijiale/longbao'
import Pailu from './pages/baijiale/pailu'

import Niuniu from './pages/niuniu'
import TwentyOne from './pages/twentyOne'
import Douniu from './pages/douniu'
import Jinhua from './pages/jinhua'
import Lunpan from './pages/lunpan'
import Toubao from './pages/toubao'
import Longhu from './pages/longhu'

export default class RouteConfig extends Component {
  render() {
    return (
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/classic" exact component={Classic} />
          <Route path="/baozhuo" exact component={BaoZhuo} />
          <Route path="/insurance" exact component={Insurance} />
          <Route path="/jinmi" exact component={Jinmi} />
          <Route path="/longbao" exact component={Longbao} />
          <Route path="/pailu" exact component={Pailu} />
          <Route path="/twentyOne" exact component={TwentyOne} />
          <Route path="/douniu" exact component={Douniu} />
          <Route path="/jinhua" exact component={Jinhua} />
          <Route path="/lunpan" exact component={Lunpan} />
          <Route path="/toubao" exact component={Toubao} />
          <Route path="/longhu" exact component={Longhu} />
          <Route path="/niuniu" exact component={Niuniu} />
          <Redirect to="/"/>
        </Switch>
    )
  }
}
