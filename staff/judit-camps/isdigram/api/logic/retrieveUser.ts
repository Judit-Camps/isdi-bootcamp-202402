import { ObjectId } from 'mongodb'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

function retrieveUser(userId: string, targetUserId: string, callback: Function) {
    validate.text(userId, 'userId', true)
    validate.text(targetUserId, 'targetUserId', true)
    validate.callback(callback)

    this.users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) {
                callback(new NotFoundError('user not found'))

                return
            }

            this.users.findOne({ _id: new ObjectId(targetUserId) })
                .then(user => {
                    if (!user) {
                        callback(new NotFoundError('target user not found'))

                        return
                    }
                    delete user._id
                    delete user.password
                    delete user.status

                    callback(null, user)
                })
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))
}


export default retrieveUser