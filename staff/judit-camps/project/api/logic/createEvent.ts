import { validate, errors } from "com"
import { User, UserType, Event, EventType } from "../data/index.ts"

const { UnauthorizedError, SystemError } = errors

function createEvent(organizationId: string, title: string, date: string, time: string, description: string, city?: string, address?: string) {
    validate.text(organizationId, "organizationId", true)
    validate.text(title, "title")
    validate.date(date)
    // validate.time
    validate.text(description, "description")

    return User.findById(organizationId)
        .catch(error => { throw new SystemError(error.message) })
        .then((org: UserType) => {
            return Event.create({
                // author: org._id,
                title: title,
                date: date,
                time: time,
                description: description,
                city: (city) ? city : org.city,
                address: (address) ? address : org.address
            })
        })

}

export default createEvent