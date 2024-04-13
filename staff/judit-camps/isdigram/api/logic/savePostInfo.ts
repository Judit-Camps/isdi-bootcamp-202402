import { validate, errors } from 'com'
import { ObjectId } from 'mongodb'

const { SystemError, NotFoundError } = errors

function savePostInfo(userId, image, text, callback) {
    validate.text(userId, 'userId', true)
    validate.url(image, 'image')
    if (text)
        validate.text(text, 'text')
    validate.callback(callback)

    this.users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) {
                callback(new NotFoundError('user not found'))
                return
            }

            this.posts.insertOne({ author: user._id, image, text, date: new Date })
                .then(() => callback(null))
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))
}

export default savePostInfo