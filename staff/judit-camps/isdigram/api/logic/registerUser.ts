// @ts-nocheck

import { validate, errors } from "com"

const { DuplicityError, SystemError } = errors


function registerUser(name: string, birthdate: string, email: string, username: string, password: string, callback: Function) {
    validate.text(name, 'name')
    validate.date(birthdate, 'birthdate')
    validate.email(email)
    validate.text(username, 'username', true)
    validate.password(password)
    validate.callback(callback)

    this.users.findOne({ $or: [{ email }, { username }] })
        .then(user => {
            if (user) {
                callback(new DuplicityError('user already exists'))

                return
            }
            user = {
                name: name.trim(),
                birthdate: birthdate,
                email: email,
                username: username,
                password: password,
                status: 'offline'
            }

            this.users.insertOne(user)
                .then(() => callback(null))
                .catch(error => callback(new SystemError(error.message)))

        })
        .catch(error => callback(new SystemError(error.message)))
}

export default registerUser