// @ts-nocheck
import { validate, errors } from "com"
const { NotFoundError, SystemError, UnauthorizedError } = errors
import { User, Event } from "../data/index.ts"

function removeEvent(userId: string, eventId: string): Promise<void> {
    validate.text(userId, "userId", true)
    validate.text(eventId, "eventId", true)

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError("user not found")

            return Event.findById(eventId)
                .catch(error => { throw new SystemError(error.message) })
                .then(ev => {
                    if (!ev) throw new NotFoundError("event not found")

                    if ((!ev.attendees.includes(userId)) || (!user.savedEvents.includes(eventId))) throw new UnauthorizedError("user unable to remove event from saved")

                    return (ev.updateOne({ _id: eventId }, { $pull: { attendees: userId } }),
                        user.updateOne({ _id: userId }, { $pull: { savedEvents: eventId } }))
                })
        })
}

export default removeEvent