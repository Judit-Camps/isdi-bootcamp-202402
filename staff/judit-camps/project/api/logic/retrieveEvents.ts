// @ts-nocheck
import { ObjectId } from "mongoose"
import { validate, errors } from "com"
import { User, Event } from "../data/index.ts"

const { SystemError, NotFoundError } = errors


function retrieveEvents(userId: string): Promise<[{ id: string, author: { id: string, name: string }, title: string, city: string, address: string, date: string, time: string, description: string, price: number }] | { id: string; author: { id: string; name: string }; title: string; city: string; address: string; date: string; time: string; description: string; price: number }[]> {

    validate.text(userId, "userId", true)


    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError("user not found")

            return Event.find().populate<{ author: { _id: ObjectId, name: string } }>('author', 'name').lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(events =>
                    events.map<{ id: string, author: { id: string, name: string }, title: string, city: string, address: string, date: string, time: string, description: string, price: number }>(({ _id, author, title, city, address, date, time, description, price }) => ({
                        id: _id.toString,
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
                        price
                    }))
                )
        })


}
export default retrieveEvents