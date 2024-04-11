// @ts-nocheck

import { ObjectId } from "mongodb"
import { validate, errors } from "com"

const { DuplicityError, SystemError } = errors


// function that deletes the actual user by clearing the sessionStorage
function logoutUser(userId, callback) {
    // validate.text(userId, 'userId', true)
    validate.callback(callback)

    this.users.findOne({ _id: userId })
        .then(user => {
            if (!user) {
                callback(new Error('user to logout not found'))
                return
            }

            this.users.updateOne({ _id: new ObjectId(userId) }, { $set: { status: 'offline' } })
                .then(() => {
                    callback(null, user)

                })
                .catch(error => callback(error))
        })
        .catch(error => callback(error))
}


export default logoutUser