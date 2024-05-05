// @ts-nocheck
import { validate, errors } from "com"
const { SystemError, NotFoundError } = errors
import { ObjectId } from "mongoose"
import { User, Event } from "../data/index.ts"

function findEvents({ organizationId, location, price, date, categories }: { organizationId?: string, location?: string, price?: number, date?: string, categories?: string[] } = {}): Promise<any> {

    let query = Event.find().populate<{ author: { _id: ObjectId, name: string } }>('author', 'name').lean()

    // Apply filters
    if (organizationId) query = query.where("author").equals(organizationId)
    if (location) query = query.where("city").equals(location)

    if (price) {
        if (price === 0) query = query.where("price").equals(0)

        else if (price === -1) query = query.where("price").equals(-1)

        else query = query.where("price").lte(price)
    }

    if (date) query = query.where("date").equals(date)

    if (categories && categories.length > 0) query = query.where("categories").in(categories)

    return query.exec()
        .catch(error => { throw new SystemError(error.message) })
        .then(events => {
            return events.map<{ id: string, author: { id: string, name: string }, title: string, city: string, address: string, date: Date, time: string, description: string, price: number, categories: string[] }>(({ _id, author, title, city, address, date, time, description, price, categories }) => ({
                id: _id.toString(),
                author: {
                    id: author._id.toString(),
                    name: author.name
                },
                title,
                city,
                address,
                date,
                time,
                description,
                price,
                categories
            }))
        })
}

export default findEvents