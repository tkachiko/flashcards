import React, { useEffect } from 'react'

import './App.scss'
import LinearProgress from '@mui/material/LinearProgress'

import { appIsInitializedSelector, appStatusSelector, authMeTC } from './app-reducer'
import { Header } from './header/Header'
import { RoutesComponent } from './routes/RoutesComponent'
import { useAppDispatch, useAppSelector } from './store'

function App() {
  const status = useAppSelector(appStatusSelector)
  const isInitialized = useAppSelector(appIsInitializedSelector)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(authMeTC())
  }, [])

  // if (!isInitialized) {
  //   return (
  //     <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
  //       <CircularProgress />
  //     </div>
  //   )
  // }

  return (
    <div className="App">
      <Header />
      {status === 'loading' && <LinearProgress color={'primary'} />}
      <RoutesComponent />
    </div>
  )
}

export default App
