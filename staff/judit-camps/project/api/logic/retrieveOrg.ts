// @ts-nocheck
import { User } from "../data/index.ts"
import { errors } from "com"

const { NotFoundError } = errors

function retrieveOrg(): Promise<{ id: string; name: string; }[]> {

    return User.find({ role: "organization" }).select("_id name").lean()
        .then(organizations => {
            if (!organizations) throw new NotFoundError("no organizations found")

            return organizations.map<{ id: string, name: string }>(({ _id, name }) => ({
                id: _id.toString(),
                name
            }))

        })
}

export default retrieveOrg