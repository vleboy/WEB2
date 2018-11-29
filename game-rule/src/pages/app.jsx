import React from 'react'
import Main from '../components/main'
import { HashRouter as Router } from 'react-router-dom'
const Home = () => {
  return (
    <Router>
      {/* <Route path={"/"} render={() => <Main />} /> */}
      <Main />
    </Router>
  )
}

export default Home
