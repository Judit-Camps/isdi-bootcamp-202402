import { validate, errors } from "com"
import { User, Event } from "../data/index.ts"
const { NotFoundError, SystemError, DuplicityError } = errors

function saveEvent(userId: string, eventId: string): Promise<any> {
    validate.text(userId, "userId", true)
    validate.text(eventId, "eventId", true)

    return Event.findById(eventId)
        .catch(error => { throw new SystemError(error.message) })
        .then(ev => {
            if (!ev) throw new NotFoundError("event not found")

            return User.findById(userId)
                .catch(error => { throw new SystemError(error.message) })
                .then(user => {
                    if (!user) throw new NotFoundError("user not found")

                    if ((ev.attendees.includes(user.id)) || (user.savedEvents.includes(ev.id))) throw new DuplicityError("user has already saved event")

                    return Event.updateOne({ _id: eventId }, { $push: { attendees: userId } })
                        .then(() => {
                            return User.updateOne({ _id: userId }, { $push: { savedEvents: eventId } })
                        })
                })
        })

}

export default saveEvent