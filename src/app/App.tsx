import React from 'react'

import './App.scss'

import { Header } from './header/Header'
import { RoutesComponent } from './routes/RoutesComponent'

function App() {
  return (
    <div className="App">
      <Header />
      <RoutesComponent />
    </div>
  )
}

export default App
