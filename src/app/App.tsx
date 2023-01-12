import React, { useEffect } from 'react'

import './App.scss'

import { LinearProgress } from '@mui/material'
import { useDispatch } from 'react-redux'

import { AppThunk } from '../common/types/types'

import { authMeTC, StatusType } from './app-reducer'
import { Header } from './header/Header'
import { RoutesComponent } from './routes/RoutesComponent'
import { useAppSelector } from './store'

function App() {
  const status = useAppSelector<StatusType>(state => state.app.status)
  const dispatch = useDispatch<AppThunk>()

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
