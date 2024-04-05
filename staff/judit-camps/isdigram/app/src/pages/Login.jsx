import { logger, showFeedback } from '../utils'
import logic from '../logic'

function Login(props) {

    logger.debug('Login')
    const handleSubmit = event => {
        event.preventDefault()
        const form = event.target

        const username = form.username.value
        const password = form.password.value

        logger.debug('Login -> handleSubmit', username, password)

        try {
            logic.loginUser(username, password)

            form.reset()

            props.onUserLoggedIn()

        } catch (error) {
            showFeedback(error)
        }
    }

    const handleRegisterClick = event => {
        event.preventDefault()

        props.onRegisterClick()
    }

    return <main id='login'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit} >
            <label htmlFor="username">username</label>
            <input type="text" id='username' />

            <label htmlFor="password">password</label>
            <input type="password" id='password' />

            <button>Log in</button>

        </form>
        <a href="" onClick={handleRegisterClick} >Register</a>
    </main>
}

export default Login