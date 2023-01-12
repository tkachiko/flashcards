import React, { useEffect } from 'react'

import './App.scss'

import { useDispatch } from 'react-redux'

import { AppThunk } from '../common/types/types'
import { authMeTC } from '../features/profile/profile-reducer'

import { Header } from './header/Header'
import { RoutesComponent } from './routes/RoutesComponent'

function App() {
  const dispatch = useDispatch<AppThunk>()

  useEffect(() => {
    dispatch(authMeTC())
  }, [])

  return (
    <div className="App">
      <Header />
      <RoutesComponent />
    </div>
  )
}

export default App
