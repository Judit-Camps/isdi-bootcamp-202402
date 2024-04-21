// @ts-nocheck
import logic from "../logic"
import { logger } from "../utils"
import { useContext } from "../context"

function Login() {

    const handleSubmit = event => {
        event.preventDefault()

        const form = event.target

        const username = form.username.value
        const password = form.password.value
    }

    return <>
        <h2>Login</h2>

        <form onSubmit={handleSubmit} action="" className="flex flex-col">
            <label htmlFor="username">Nom d'usuari</label>
            <input type="text" id="username" />

            <label htmlFor="password">Contrassenya</label>
            <input type="password" id="password" />

            <button type="submit">Entrar</button>
        </form>
    </>
}

export default Login