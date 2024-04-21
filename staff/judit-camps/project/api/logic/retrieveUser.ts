import { UserType, User } from "../data/index.ts"
import { validate, errors } from "com"

const { SystemError, NotFoundError } = errors

function retrieveUser(userId: string, targetUserId: string): Promise<{ name: string, username: string }> {
    validate.text(userId, "userId", true)
    validate.text(targetUserId, "targetUserId", true)

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError("user not found")

            return User.findById(targetUserId).select("-_id name username").lean()
        })
        .then(targetUser => {
            if (!targetUser) throw new NotFoundError("target user not found")

            return { name: targetUser.name, username: targetUser.username }
        })
}

export default retrieveUser