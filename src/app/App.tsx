import React, { useEffect } from 'react'

import './App.scss'

import { LinearProgress } from '@mui/material'

import { authMeTC, StatusType } from './app-reducer'
import { Header } from './header/Header'
import { RoutesComponent } from './routes/RoutesComponent'
import { useAppDispatch, useAppSelector } from './store'

function App() {
  const status = useAppSelector<StatusType>(state => state.app.status)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(authMeTC())
  }, [])

  return (

    <div className="App">
      <Header />
      {status === 'loading' && <LinearProgress color={'primary'} />}
      <RoutesComponent />
    </div>
  )
}

export default App
