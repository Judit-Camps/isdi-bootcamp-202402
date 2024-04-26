// @ts-nocheck
import { useState } from "react"
import { Context } from "./context"
import { Routes, Route, Navigate, useNavigate } from "react-router-dom"

import { errors } from "com"
const { UnauthorizedError } = errors

import logic from "./logic"

import Register from "./pages/Register"
import Login from "./pages/Login"
import Home from "./pages/Home"
import HomeUser from "./pages/HomeUser"
import OrgForm from "./components/OrgForm"
import { logger } from "./utils"


function App() {
  const [feedback, useFeedback] = useState(null)

  const navigate = useNavigate()

  const goToLogin = () => navigate("/login")

  const handleLoginClick = () => goToLogin()

  const handleOnUserLoggedIn = () => navigate("/main")


  logger.debug("App -> render")
  return <>

    <Routes>
      <Route path="/login" element={logic.isUserLoggedIn() ? <Navigate to="/main" /> : <Login onUserLoggedIn />} />
      <Route path="/register" element={logic.isUserLoggedIn() ? <Navigate to="/main" /> : <Register />} />
      <Route path="/main/*" element={logic.isUserLoggedIn() ? <HomeUser /> : <Login />} />
      <Route path="/*" element={logic.isUserLoggedIn() ? <Navigate to="/main" /> : <Home onLoginClick={handleLoginClick} />} />
    </Routes>

  </>
}

export default App
