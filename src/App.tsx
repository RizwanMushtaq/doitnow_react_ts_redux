import React from 'react';
import './App.css';
import { logWithDebug } from './utils/logHandling'
import { Routes, Route, Navigate} from 'react-router-dom'
import { RootState } from './app/store'
import { useSelector } from 'react-redux'

import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import AppPage from './pages/AppPage';

function App() {

  const isLoggedIn = useSelector((state: RootState) => state.login.value)
  
  logWithDebug(`isLoggedIn is ${isLoggedIn}`)

  return (
    <div className="App">
      <Routes>
        <Route path='/'  element={<Navigate replace to="/login" />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/registration' element={<RegistrationPage />}></Route>
        {
          !isLoggedIn && <Route path='/app' element={<Navigate replace to="/login" />}></Route>
        }
        {
          isLoggedIn && <Route path='/app' element={<AppPage />}></Route>
        }
      </Routes>    
    </div>
  )
}

export default App;
