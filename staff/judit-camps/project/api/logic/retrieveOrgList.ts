// @ts-nocheck
import { User } from "../data/index.ts"
import { errors } from "com"

const { NotFoundError } = errors

function retrieveOrgList(): Promise<{ id: string; name: string; }[]> {

    return User.find({ role: "organization" }).select("_id name email").lean()
        .then(organizations => {
            if (!organizations) throw new NotFoundError("no organizations found")

            return organizations
                .sort((a, b) => a.name.localeCompare(b.name))
                .map<{ id: string, name: string, email: string }>(({ _id, name, email }) => ({
                    id: _id.toString(),
                    name,
                    email
                }))

        })
}

export default retrieveOrgList