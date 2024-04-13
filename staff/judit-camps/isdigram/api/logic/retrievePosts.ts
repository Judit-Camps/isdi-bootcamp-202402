import { ObjectId } from "mongodb"
import { validate, errors } from "com"

const { DuplicityError, SystemError, NotFoundError } = errors

function retrievePostsLatestFirst(userId, callback) {
    validate.text(userId, 'userId', true)
    validate.callback(callback)

    this.users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) {
                callback(new NotFoundError('user not found'))
                return
            }

            this.posts.find({})
                .then(posts => {
                    let count = 0
                    let errorDetected = false

                    posts.forEach(post => {
                        this.users.findOne({ _id: post.author })
                            .then(user => {
                                if (errorDetected) return

                                if (!user) {
                                    callback(new Error('post owner not found'))

                                    errorDetected = true

                                    return
                                }

                                post.id = post._id.toString()
                                delete post._id

                                post.author = {
                                    id: user.id,
                                    username: user.username
                                }

                                count++

                                if (count === posts.length) {
                                    callback(null, posts.reverse())
                                }
                            })
                            .catch(error => callback(new SystemError(error.message)))
                    })
                })
                .catch(error => callback(new SystemError(error.message)))

        })
        .catch(error => callback(new SystemError(error.message)))
}

export default retrievePostsLatestFirst
