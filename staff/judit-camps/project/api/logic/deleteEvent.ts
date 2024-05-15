// @ts-nocheck
import { validate, errors } from "com"
import { User, Event, UserType, EventType } from "../data/index.ts"
const { SystemError, NotFoundError, UnauthorizedError } = errors
import mongoose from "mongoose"
const { Types: { ObjectId } } = mongoose

function deleteEvent(organizationId, eventId): Promise<void> {
    validate.text(organizationId, "organizationId", true)
    validate.text(eventId, "eventId", true)

    return User.findById(organizationId)
        .catch(error => { throw new SystemError(error.message) })
        .then((org: UserType) => {
            if (!org) throw new NotFoundError("organization not found")

            return Event.findById(eventId)
                .catch(error => { throw new SystemError(error.message) })
                .then((ev: EventType) => {
                    if (!ev) throw new NotFoundError("event not found")

                    if (org._id.toString() !== ev.author.toString()) throw new UnauthorizedError("organization unauthorized for deletion")

                    return User.updateMany(
                        { savedEvents: eventId },
                        { $pull: { savedEvents: eventId } }
                    )
                        .then(() => {
                            return Event.deleteOne({ _id: new ObjectId(eventId) })
                                .catch(error => { throw new SystemError(error.message) })
                                .then(res => { })
                        })
                })
        })
}

export default deleteEvent