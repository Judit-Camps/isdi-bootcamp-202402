import { logger, showFeedback } from '../utils'

import logic from '../logic'

import { Link } from 'react-router-dom'

import { useState, useEffect } from 'react'

function User(props) {

    const [user, setUser] = useState(null)

    // const [user, setUser] = 
    const handleLogoutClick = () => {
        try {
            logic.logoutUser()
        } catch (error) {
            logic.cleanUpLoggedInUser()
        } finally {
            props.onLogoutClick()
        }
    }



    useEffect(() => {
        try {
            logic.retrieveUser()
                .then(setUser)
                .catch(showFeedback)

        } catch (error) {
            showFeedback(error)
        }
    }, [])

    logger.debug('User -> Render')
    return <main id="user-page">
        <header>
            <h3>Isdigram</h3>
            <button>Chat</button>

        </header>
        {user && <h1>hello, {user.name}!</h1>}
        <button>Change password</button>
        <button onClick={handleLogoutClick}>Log out</button>

        <footer className="footer">
            <Link to="/" ><button>home</button></Link>
            <button>+</button>
            <button>user</button>

        </footer>
    </main>
}


export default User