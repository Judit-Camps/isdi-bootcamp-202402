import { ObjectId } from "mongodb"
import { validate, errors } from "com"

const { DuplicityError, SystemError } = errors

function removePost(postId) {
    // const post = db.posts.findOne(post => post.id === postId)

    // if (!post) throw new Error('post not found')

    // if (post.author !== sessionStorage.userId) throw new Error('post does not belong to user')

    // db.posts.deleteOne(post => post.id === postId)
}

export default removePost
