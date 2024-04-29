// @ts-nocheck
import React, { createContext, useState } from 'react'

export const AuthContext = createContext()
import logic from '../logic'

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [role, setRole] = useState(null)


    const logout = () => {
        try {
            logic.logOutUser()
            navigation.navigate("Home")
            setUser(null)
        } catch (error) {
            console.error(error)

        }
    }

    const getUserInfo = () => {

    }

    const getUserRole = () => {

    }

    return (
        <AuthContext.Provider value={{ user, login, logout, role }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
