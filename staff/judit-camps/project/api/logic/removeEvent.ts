import { User, Event } from "../data/index.ts"
import { validate, errors } from "com"
const { NotFoundError, SystemError } = errors

function removeEvent(userId, eventId): Promise<any> {
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

                    if (!ev.attendees.includes(userId) || !user.savedEvents.includes(eventId)) throw new NotFoundError("event is not saved")

                    return Event.updateOne({ _id: eventId }, { $pull: { attendees: userId } })
                        .then(() => {
                            return User.updateOne({ _id: userId }, { $pull: { savedEvents: eventId } })
                        })
                })
        })
}

export default removeEvent