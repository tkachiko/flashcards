import React from 'react'

import './App.css'
import { RoutesComponent } from './routes/RoutesComponent'
import {Header} from "./header/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <RoutesComponent />
    </div>
  )
}

export default App
