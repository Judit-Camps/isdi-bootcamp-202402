import { User, UserType } from "../data/index.ts"

import { validate, errors } from "com"

const { DuplicityError, SystemError } = errors

function registerUser(name: string, username: string, email: string, password: string): Promise<void> {
    validate.text(name, "name")
    validate.text(username, "username", true)
    validate.email(email)
    validate.password(password)

    return User.findOne({ $or: [{ email }, { username }] })
        .catch(error => { throw new SystemError(error.message) })
        .then((user: UserType) => {
            if (user)
                throw new DuplicityError("user already exists")

            user = {
                name: name.trim(),
                username: username,
                email: email,
                password: password,
                status: "active",
                role: "regular"
            }

            return User.create(user)
                .catch(error => { throw new SystemError(error.message) })
                .then(user => { })
        })

}

export default registerUser