import utils from '../utils'
import logic from '../logic'
import { Component } from 'react'

class Login extends Component {
    constructor() {
        super()
    }

    render() {
        return <main>
            <h1>Login</h1>
            <form onSubmit={event => {
                event.preventDefault()
                const form = event.target

                const username = form.username.value
                const password = form.password.value

                try {
                    logic.loginUser(username, password)

                    form.reset()

                    this.props.onUserLoggedIn()

                } catch (error) {
                    utils.showFeedback(error)
                }
            }} >
                <label htmlFor="username">username</label>
                <input type="text" id='username' />

                <label htmlFor="password">password</label>
                <input type="password" id='password' />

                <button>Log in</button>

            </form>
            <a href="" onClick={event => {
                event.preventDefault()
                this.props.onRegisterClick()
            }} >Register</a>
        </main>
    }
}

export default Login