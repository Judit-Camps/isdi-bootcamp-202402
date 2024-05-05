// @ts-nocheck
import { validate, errors } from "com"
import { User, Event, UserType, EventType } from "../data/index.ts"
const { NotFoundError, SystemError, DuplicityError } = errors

function savedEvent(userId: string, eventId: string): Promise<void> {
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

                    if (ev.attendees.includes(userId) || user.savedEvents.includes(eventId)) throw new DuplicityError("event already saved by user")

                    return (ev.updateOne({ _id: eventId }, { $push: { attendees: userId } }),
                        user.updateOne({ _id: userId }, { $push: { savedEvents: eventId } }))
                })
        })



}

export default savedEvent