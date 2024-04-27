import { User } from "../data/index.ts"

import { validate, errors } from "com"
const { SystemError, CredentialsError, NotFoundError, UnauthorizedError } = errors

function authenticate(username: string, password: string): Promise<{ userId: string, role: string, status: string }> {
    validate.text(username, "username", true)
    validate.password(password)

    return User.findOne({ username })
        .catch(error => { throw new SystemError(error.message) })
        .then(userOrOrg => {

            if (!userOrOrg)
                throw new NotFoundError("user or organization not found")

            if (userOrOrg.password !== password)
                throw new CredentialsError("wrong credentials")

            if (userOrOrg.status === "inactive")
                throw new UnauthorizedError("organization not authorized for login yet")

            if (userOrOrg.status === "accepted")
                userOrOrg.status = "active"

            return userOrOrg.save()
                .then(authUser => ({ userId: authUser.id, role: authUser.role, status: authUser.status }))

        })
}

export default authenticate