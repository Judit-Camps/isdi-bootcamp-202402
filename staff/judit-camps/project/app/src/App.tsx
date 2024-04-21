// @ts-nocheck
import { useState } from "react"
import { Context } from "./context"
import { Routes, Route, Navigate, useNavigate } from "react-router-dom"

import "./App.sass"
import { errors } from "com"
const { UnauthorizedError } = errors

import logic from "./logic"

import Register from "./pages/Register"
import Login from "./pages/Login"
import Home from "./pages/Home"


function App() {
  const [feedback, useFeedback] = useState(null)

  return <>

    <Register />


    <Login />


  </>
}

export default App
