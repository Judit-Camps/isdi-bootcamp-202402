// @ts-nocheck
import logic from "../logic"
import { logger } from "../utils"
import { useContext } from "../context.ts"

function Register() {
    // const { showFeedback } = useContext()

    const handleSubmit = event => {
        event.preventDefault()

        const form = event.target

        const name = form.name.value
        const username = form.username.value
        const email = form.email.value
        const password = form.password.value

        try {
            logic.registerUser(name, username, email, password)
                .then(() => {
                    form.reset()

                })
                .catch(error => console.error(error))

        } catch (error) {
            console.error(error)
        }
    }

    logger.debug("Register -> render")
    return <>
        <h3>Register page</h3>
        <form onSubmit={handleSubmit} className="flex flex-col">
            <label htmlFor="name">Nom</label>
            <input type="text" id="name" />

            <label htmlFor="username">Nom d'usuari</label>
            <input type="text" id="username" />

            <label htmlFor="email">Correu</label>
            <input type="email" id="email" />

            <label htmlFor="password">Contrassenya</label>
            <input type="password" id="password" />

            <button type="submit">Registra't</button>
        </form>
    </>
}

export default Register