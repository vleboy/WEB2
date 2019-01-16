import React from 'react'
import Main from '../components/main'
import { HashRouter } from 'react-router-dom'
const Home = () => {
  return (
    <HashRouter onUpdate={() => window.scrollTo(0, 0)}>
      <Main />
    </HashRouter>
  )
}

export default Home
