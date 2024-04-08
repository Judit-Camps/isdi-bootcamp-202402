import { logger, showFeedback } from '../utils'

import logic from "../logic.mjs"

function User(props) {

    const handleLogoutClick = () => {
        try {
            logic.logoutUser()
        } catch (error) {
            logic.cleanUpLoggedInUser()
        } finally {
            props.onLogoutClick()
        }
    }


    let user
    try {
        user = logic.getUser()
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