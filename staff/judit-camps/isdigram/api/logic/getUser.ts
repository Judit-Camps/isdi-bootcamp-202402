// @ts-nocheck

import { ObjectId } from "mongodb"
import { validate, errors } from "com"

const { DuplicityError, SystemError } = errors


function getUser(userId: string, targetUserId: string, callback: Function) {
    validate.text(userId, 'userId', true)
    validate.text(targetUserId, 'targetUserId', true)
    validate.callback(callback)

    this.users.findOne({ _id: userId })
        .then(user => {
            if (!user) {
                callback(new Error('user not found'))

                return
            }

            this.user.findOne({ _id: new ObjectId(targetUserId) })
                .then(user => {
                    if (!user) {
                        callback(new Error('user not found'))

                        return
                    }
                    delete user._id
                    delete user.password
                    delete user.status
                    callback(null, user)
                })
                .catch(error => callback(error))
        })
        .catch(error => callback(error))
}


export default getUser