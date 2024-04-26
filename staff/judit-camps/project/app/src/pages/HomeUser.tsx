// @ts-nocheck
import { useState, useEffect } from "react"
import logic from "../logic"

import SearchBar from "../components/SearchBar"

import { useContext } from "../context"


function HomeUser() {
    const [user, setUser] = useState(null)

    const showFeedback = useContext()

    useEffect(() => {
        try {
            logic.retrieveUser()
                .then(setUser)
                .catch(error => showFeedback(error.message))
        } catch (error) {
            showFeedback(error.message)
        }

    }, [])

    return <>
        <header className="bg-red-200 top-0 fixed w-full">
            {user && <h2>Hello - {user.name} </h2>}

            <SearchBar></SearchBar>
        </header>


        <footer className="flex">
            <button>map</button>
            <button>home</button>
            <button>user</button>
        </footer>
    </>
}

export default HomeUser