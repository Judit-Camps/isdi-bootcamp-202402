// @ts-nocheck
import { validate, errors } from "com"
import { User, UserType, Event, EventType } from "../data/index.ts"

const { UnauthorizedError, SystemError, NotFoundError } = errors

function createEvent(organizationId: string, title: string, date: string, time: string, description: string, price: number, city?: string, address?: string, categories?: string[]): Promise<void> {
    debugger
    validate.text(organizationId, "organizationId", true)
    validate.text(title, "title")
    validate.date(date, "date")
    // validate.time
    validate.text(description, "description")

    return User.findById(organizationId)
        .catch(error => { throw new SystemError(error.message) })
        .then((org: UserType) => {
            if (!org)
                throw new NotFoundError("organization not found")

            return Event.create({
                author: org._id,
                title: title,
                date: date,
                time: time,
                description: description,
                city: org.city,
                address: org.address,
                price: price
            })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(ev => { })

}

export default createEvent