import React, { useEffect } from 'react'

import './App.scss'

import CircularProgress from '@mui/material/CircularProgress'
import LinearProgress from '@mui/material/LinearProgress'

import { authMeTC, StatusType } from './app-reducer'
import { Header } from './header/Header'
import { RoutesComponent } from './routes/RoutesComponent'
import { useAppDispatch, useAppSelector } from './store'

function App() {
  const status = useAppSelector<StatusType>(state => state.app.status)
  const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(authMeTC())
  }, [])

  if (!isInitialized) {
    return (
      <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <div className="App">
      <Header />
      {status === 'loading' && <LinearProgress color={'primary'} />}
      <RoutesComponent />
    </div>
  )
}

export default App
