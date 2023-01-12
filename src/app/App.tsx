import React, { useEffect } from 'react'

import './App.scss'

import { CircularProgress, LinearProgress } from '@mui/material'
import { useDispatch } from 'react-redux'

import { AppThunk } from '../common/types/types'

import { authMeTC, StatusType } from './app-reducer'
import { Header } from './header/Header'
import { RoutesComponent } from './routes/RoutesComponent'
import { useAppSelector } from './store'

function App() {
  const status = useAppSelector<StatusType>(state => state.app.status)
  const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized)
  const dispatch = useDispatch<AppThunk>()

  useEffect(() => {
    dispatch(authMeTC())
  }, [])
  if (!isInitialized) {
    return (
      <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
        <CircularProgress size={'80px'} />
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
