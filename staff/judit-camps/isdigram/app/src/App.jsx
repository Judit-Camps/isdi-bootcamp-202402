import { logger } from './utils'

import logic from './logic'

import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'


function App() {
  const navigate = useNavigate()

  const goToLogin = () => navigate('/login')

  const handleLoginClick = () => goToLogin()

  const handleRegisterClick = () => navigate('/register')

  const handleUserLoggedIn = () => navigate('/')

  const handleUserClick = () => navigate('/profile')


  logger.debug('App -> render')

  return <>
    <Routes>
      <Route path="/login" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Login onRegisterClick={handleRegisterClick} onUserLoggedIn={handleUserLoggedIn} />} />

      <Route path="/register" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Register onLoginClick={handleLoginClick} onUserRegistered={handleLoginClick} />} />

      <Route path="/*" element={logic.isUserLoggedIn() ? <Home onChatClick={() => handleChatClick} onUserPageClick={() => handleUserClick} /> : <Navigate to="/login" />} />

    </Routes>

  </>

}

export default App