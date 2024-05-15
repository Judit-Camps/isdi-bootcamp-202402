import { UserType, User } from "../data/index.ts"
import { validate, errors } from "com"

const { SystemError, NotFoundError } = errors

function retrieveUser(userId: string, targetUserId: string): Promise<{ name: string, username: string, email: string, city?: string, address?: string }> {
    validate.text(userId, "userId", true)
    validate.text(targetUserId, "targetUserId", true)

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError("user not found")

            return User.findById(targetUserId).select("-_id name username email role city address").lean()
        })
        .then(targetUser => {
            if (!targetUser) throw new NotFoundError("target user not found")


            if (targetUser.role === "regular") {
                return { name: targetUser.name, username: targetUser.username, email: targetUser.email }

            } else if (targetUser.role === "organization") {
                return { name: targetUser.name, username: targetUser.username, email: targetUser.email, city: targetUser.city, address: targetUser.address }

            }
        })
}

export default retrieveUser