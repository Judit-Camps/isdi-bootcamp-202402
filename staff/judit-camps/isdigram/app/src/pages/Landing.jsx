import { logger } from '../utils'

function Landing(props) {

    const handleLoginClick = (event) => {
        event.preventDefault()

        props.onLoginClick()
    }

    const handleRegisterClick = (event) => {
        event.preventDefault()

        props.onRegisterClick()
    }

    logger.debug('Landing -> render')

    return <main className='landing-main'>
        <h1 className='landing-title'>App</h1>

        <a className="landing-link" href="" onClick={handleLoginClick}>Login</a>

        <a className="landing-link" href="" onClick={handleRegisterClick}>Register</a>
    </main>
}

export default Landing