// @ts-nocheck
import { validate, errors } from "com"
const { SystemError, NotFoundError } = errors
import { ObjectId } from "mongoose"
import { User, Event } from "../data/index.ts"

function findEvents({ organizationId, location, price, date, categories }: { organizationId?: string, location?: string, price?: number, date?: string, categories?: string[] } = {}): Promise<any> {

    const decodedCategories = categories ? categories.map(category => decodeURIComponent(category)) : []

    const today = new Date().setHours(0, 0, 0, 0)

    let query = Event.find({ date: { $gte: today } })

    // Apply filters
    if (organizationId) query = query.where("author").equals(organizationId)
    if (location) query = query.where("city").equals(decodeURIComponent(location))

    if (price) {
        if (price === 0) query = query.where("price").equals(0)

        else if (price === -1) query = query.where("price").equals(-1)

        else query = query.where("price").lte(price)
    }

    if (date) query = query.where("date").equals(date)

    if (categories && categories.length > 0) query = query.where("categories").all(decodedCategories)

    query = query.populate<{ author: { _id: ObjectId, name: string } }>('author', 'name').lean()
        .populate<{ attendees: { _id: ObjectId, name: string, username: string } }>('attendees', '_id name username').lean()
        .sort({ date: 1 })
        .sort({ 'attendees.length': -1 })


    return query.exec()
        .catch(error => { throw new SystemError(error.message) })
        .then(events => {

            return events.map<{ id: string, author: { id: string, name: string }, title: string, city: string, address: string, date: Date, time: string, description: string, price: number, categories: string[], attendees: [{ id: string, name: string, username: string }] }>(({ _id, author, title, city, address, date, time, description, price, categories, attendees }) => ({
                id: _id.toString(),
                author: {
                    id: author._id.toString(),
                    name: author.name
                },
                title,
                city,
                address,
                date,
                dateText: date.toLocaleDateString("ca-ES", {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                }),
                time,
                description,
                price,
                categories,
                attendees: attendees.map(att => ({
                    id: att._id.toString(),
                    name: att.name,
                    username: att.username
                }))
            }))
        })
}

export default findEvents