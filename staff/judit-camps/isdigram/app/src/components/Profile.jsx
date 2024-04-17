import { logger, showFeedback } from '../utils'

import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'


function Profile(props) {

    const { username } = useParams()

    logger.debug('Profile -> Render')
    return <main id="user-page">
        <header>
            <h3>Isdigram</h3>
            <button>Chat</button>

        </header>

        <h1>{username}!</h1>


        <footer className="footer">
            <Link to="/" ><button> home </button></Link>
            <button>+</button>
            <button>user</button>

        </footer>
    </main>
}


export default Profile