// @ts-nocheck
import { ObjectId } from "mongodb"
import { validate, errors } from "com"

const { DuplicityError, SystemError } = errors


function loginUser(username: string, password: string, callback: Function) {
    validate.text(username, 'username', true)
    validate.password(password)
    validate.callback(callback)

    this.users.findOne({ username: username })
        .then(user => {
            if (!user) {
                callback(new Error('user not found'))
                return
            }
            if (user.password !== password) {
                callback(new Error('wrong password'))
                return
            }

            const userId = user._id

            this.users.updateOne({ _id: new ObjectId(userId) }, { $set: { status: 'online' } })
                .then(() => { callback(null, userId.toString()) })
                .catch(error => { callback(error) })


        })
        .catch(error => callback(error))
}



export default loginUser