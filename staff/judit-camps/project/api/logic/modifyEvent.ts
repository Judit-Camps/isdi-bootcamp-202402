import { validate, errors } from "com"
import { User, Event } from "../data/index.ts"
const { SystemError, NotFoundError, UnauthorizedError } = errors

function modifyEvent(organizationId: string, eventId: string, title?: string, location?: string, address?: string, description?: string, categories?: string[], date?: string, time?: string): Promise<void> {
    validate.text(organizationId, "organizationId", true)
    validate.text(eventId, "eventId", true)
    if (title) validate.text(title, "title")
    if (location) validate.text(location, "location")
    if (address) validate.text(address, "address")
    if (description) validate.text(description, "description")
    if (date) validate.date(Date)


    return User.findById(organizationId)
        .catch(error => { throw new SystemError(error.message) })
        .then(org => {
            if (!org)
                throw new NotFoundError("organization not found")

            return Event.findById(eventId)
                .catch(error => { throw new SystemError(error.message) })
                .then(ev => {
                    if (!ev)
                        throw new NotFoundError("event not found")

                    if (ev.author.toString() !== organizationId)
                        throw new UnauthorizedError("organization unauthorized for edition")

                    return Event.updateOne({ _id: eventId, author: organizationId }, {
                        $set: {
                            title,
                            location,
                            address,
                            description,
                            categories,
                            date: new Date(date),
                            time
                        }
                    })
                        .catch(error => { throw new SystemError(error.message) })
                })
                .then(() => { })
        })
}


export default modifyEvent