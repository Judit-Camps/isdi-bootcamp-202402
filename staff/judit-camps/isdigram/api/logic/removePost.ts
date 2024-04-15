import { ObjectId } from "mongodb"
import { validate, errors } from "com"

const { NotFoundError, SystemError } = errors

function removePost(userId, postId, callback) {
    validate.text(userId, 'userId', true)
    validate.text(postId, 'postId', true)
    validate.callback(callback)

    this.posts.findOne({ _id: new ObjectId(postId) })
        .then(post => {
            if (!post) {
                callback(new NotFoundError('post not found'))
                return
            }

            // if (post.author.id !== userId) {
            //     callback(new Error('user unable to delete this post'))
            //     return
            // }

            this.posts.deleteOne({ _id: new ObjectId(postId) })
                .then(callback(null))
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))

}

export default removePost
