import { logger, showFeedback } from '../utils'

import logic from '../logic'

import { useState } from 'react'

function User(props) {

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



    try {

        logic.retrieveUser((error, user) => {
            if (error) {
                logger.error(error)
            }
        })
    } catch (error) {
        showFeedback(error)
    }

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
            <button onClick={event => {
                event.preventDefault()

                props.onHomeClick()
            }}>home</button>
            <button>+</button>
            <button>user</button>

        </footer>
    </main>
}


export default User