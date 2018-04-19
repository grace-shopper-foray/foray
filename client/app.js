import React from 'react'

import {Navbar, Footer} from './components'
import Routes from './routes'


const App = () => {
  return (
    <div className="container">
      <Navbar />
      <Routes />
      <Footer />
    </div>
  )
}

export default App
