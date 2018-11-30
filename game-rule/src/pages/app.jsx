import React from 'react'
import Main from '../components/main'
import { BrowserRouter } from 'react-router-dom'
const Home = () => {
  return (
    <BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
      <Main />
    </BrowserRouter>
  )
}

export default Home
