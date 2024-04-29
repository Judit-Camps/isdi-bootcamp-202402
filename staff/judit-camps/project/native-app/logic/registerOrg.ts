// @ts-nocheck
import { validate, errors } from "../com/index.js"

const { SystemError, DuplicityError } = errors

function registerOrg(name: string, username: string, email: string, password: string, location: string, address: string, description: string) {
    validate.text(name, "name")
    validate.text(username, "username", true)
    validate.email(email)
    validate.password(password)
    validate.text(location, "location")
    validate.text(address, "address")
    validate.text(description, "description")

    const org = { name, username, email, password, location, address, description }

    const json = JSON.stringify(org)

    return fetch("http://192.168.1.128:9000/organizations", {
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

export default registerOrg