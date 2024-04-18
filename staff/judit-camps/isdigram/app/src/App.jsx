import { logger } from './utils'

import logic from './logic'

import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Feedback from './components/Feedback'
import Confirm from './components/Confirm'

import { useState } from 'react'
import { Context } from './context'


function App() {
  const [feedback, setFeedback] = useState(null)
  const [confirm, setConfirm] = useState(null)

  const navigate = useNavigate()

  const goToLogin = () => navigate('/login')

  const handleLoginClick = () => goToLogin()

  const handleRegisterClick = () => navigate('/register')

  const handleUserLoggedIn = () => navigate('/')

  const handleUserClick = () => navigate('/profile')

  const handleFeedback = (message, level = 'warn') => setFeedback({ message, level })
  const handleConfirm = (message, callback) => setConfirm({ message, callback })

  const handleFeedbackAcceptClick = () => setFeedback(null)
  const handleConfirmAcceptClick = () => {
    confirm.callback(true)
    setConfirm(null)
  }
  const handleConfirmCancelClick = () => {
    confirm.callback(false)
    setConfirm(null)
  }

  logger.debug('App -> render')

  return <>

    <Context.Provider value={{ showFeedback: handleFeedback, showConfirm: handleConfirm }} >
      <Routes>
        <Route path="/login" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Login onRegisterClick={handleRegisterClick} onUserLoggedIn={handleUserLoggedIn} />} />

        <Route path="/register" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Register onLoginClick={handleLoginClick} onUserRegistered={handleLoginClick} />} />

        <Route path="/*" element={logic.isUserLoggedIn() ? <Home onChatClick={() => handleChatClick} onUserPageClick={() => handleUserClick} /> : <Navigate to="/login" />} />

      </Routes>
    </Context.Provider>

    {feedback && <Feedback message={feedback.message} level={feedback.level} onAcceptClick={handleFeedbackAcceptClick} />}

    {confirm && <Confirm message={confirm.message} onAcceptClick={handleConfirmAcceptClick} onCancelClick={handleConfirmCancelClick} />}

  </>

}

export default App