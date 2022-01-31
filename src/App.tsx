import React from 'react';
import './App.css';
import { logWithDebug } from './utils/logHandling'

import { RootState } from './app/store'
import { useSelector } from 'react-redux'

import LoginPage from './pages/LoginPage';
import AppPage from './pages/AppPage';

function App() {

  const isLoggedIn = useSelector((state: RootState) => state.login.value)
  
  logWithDebug(`isLoggedIn is ${isLoggedIn}`)

  let viewer = null;
  if(!isLoggedIn){
    viewer = <LoginPage></LoginPage>
  } else {
    viewer = <AppPage></AppPage>
  }

  return (
    <div className="App">
      {viewer}    
    </div>
  )
}

export default App;
