// @ts-nocheck
import { validate, errors } from "com"

function registerUser(name: string, username: string, email: string, password: string) {
    validate.text(name, "name")
    validate.text(username, "username", true)
    validate.email(email)
    validate.password(password)

    const user = { name, username, email, password }

    const json = JSON.stringify(user)

    return fetch("http://localhost:9000/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: json
    })
        .then(res => {
            if (res.status === 201) return

            return res.json()
                .then(body => {
                    const { error, message } = body
                    const constructor = errors[error]
                    throw new constructor(message)
                })
        })
}

export default registerUser