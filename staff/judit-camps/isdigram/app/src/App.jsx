import { logger } from './utils'

import logic from './logic'

import { useState } from 'react'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Chat from './pages/Chat'
import User from './pages/User'


function App() {
  const [view, setView] = useState(logic.isUserLoggedIn() ? 'home' : 'landing')


  const goToLogin = () => setView('login')

  const handleLoginClick = () => goToLogin()

  const handleRegisterClick = () => setView('register')

  const handleUserLoggedIn = () => setView('home')

  const handleUserLoggedOut = () => goToLogin()

  logger.debug('App -> render')

  return <>
    {view === 'landing' && <Landing onLoginClick={handleLoginClick} onRegisterClick={handleRegisterClick} />}

    {view === 'login' && <Login onRegisterClick={handleRegisterClick} onUserLoggedIn={handleUserLoggedIn} />}

    {view === 'register' && <Register onLoginClick={handleLoginClick} onUserRegistered={handleLoginClick} />}

    {view === 'home' && <Home onChatClick={() => setView('chat')} onUserPageClick={() => setView('user')} />}

    {view === 'user' && <User onLogoutClick={handleUserLoggedOut} onHomeClick={() => setView('home')} />}

    {view === 'chat' && <Chat onHomeClick={() => setView('home')} />}
  </>

}

export default App