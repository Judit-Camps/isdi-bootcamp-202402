// @ts-nocheck
import { ObjectId } from "mongoose"
import { validate, errors } from "com"
import { User, Event } from "../data/index.ts"
import { stringify } from "querystring";

const { SystemError, NotFoundError } = errors


function retrieveSavedEvents(userId: string): Promise<[{ id: string, author: { id: string, name: string }, title: string, city: string, address: string, date: string, time: string, description: string, price: number, attendees: string[] }] | { id: string; author: { id: string; name: string }; title: string; city: string; address: string; date: string; time: string; description: string; price: number; attendees: string[] }[]> {

    debugger
    validate.text(userId, "userId", true)


    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError("user not found")

            return Event.find({ _id: { $in: user.savedEvents } })
                .populate<{ author: { _id: ObjectId, name: string } }>('author', 'name').lean()
                .populate<{ attendees: { _id: ObjectId, name: string, username: string } }>('attendees', '_id name username').lean()
                .sort({ date: 1 })
                .sort({ 'attendees.length': -1 })

                .catch(error => { throw new SystemError(error.message) })
                .then(events =>
                    events.map<{ id: string, author: { id: string, name: string }, title: string, city: string, address: string, date: string, time: string, description: string, price: number, attendees: string[] }>(({ _id, author, title, city, address, date, time, description, price, attendees }) => ({
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
                        attendees: attendees.map(att => ({
                            id: att._id.toString(),
                            name: att.name,
                            username: att.username
                        }))
                    }))
                )
        })


}
export default retrieveSavedEvents