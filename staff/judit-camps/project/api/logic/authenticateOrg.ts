import { User, UserType } from "../data/index.ts"

import { validate, errors } from "com"
const { SystemError, CredentialsError, NotFoundError, UnauthorizedError } = errors

function authenticateOrg(email: string, password: string): Promise<{ id: string, status: string }> {
    validate.email(email)
    validate.password(password)

    return User.findOne({ email: email })
        .catch(error => { throw new SystemError(error.message) })
        .then(org => {
            if (!org)
                throw new NotFoundError("organization not found")

            if (org.password !== password)
                throw new CredentialsError("wrong credentials")

            if (org.status === "inactive")
                throw new UnauthorizedError("organization not authorized for login yet")

            if (org.status === "accepted")
                org.status = "active"

            return org.save()
                .then(() => ({ id: org._id.toString(), status: org.status }))
        })
}

export default authenticateOrg