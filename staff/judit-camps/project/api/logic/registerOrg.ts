
import { User, UserType } from "../data/index.ts"

import { validate, errors } from "com"

const { SystemError, DuplicityError } = errors

function registerOrg(name: string, username: string, email: string, password: string, location: string, address: string, description: string): Promise<void> {
    validate.text(name, "name")
    validate.text(username, "username", true)
    validate.email(email)
    validate.password(password)
    validate.text(location, "location")
    validate.text(address, "address")
    validate.text(description, "description")

    return User.findOne({ $or: [{ email }, { username }] })
        .catch(error => { throw new SystemError(error.message) })
        .then((org: UserType) => {
            if (org)
                throw new DuplicityError("organization already exists")

            org = {
                name: name.trim(),
                username: username,
                email: email,
                password: password,
                city: location.trim(),
                address: address.trim(),
                description: description,
                status: "inactive",
                role: "organization"
            }

            return User.create(org)
                .catch(error => { throw new SystemError(error.message) })
                .then(org => { })
        })
}

export default registerOrg