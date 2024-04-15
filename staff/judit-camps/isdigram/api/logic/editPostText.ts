import { ObjectId } from 'mongodb'
import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

function editPostText(postId, newCaption, callback) {
    validate.text(postId, 'postId', true)
    validate.text(newCaption, 'new caption')
    validate.callback(callback)

    this.posts.findOne({ _id: new ObjectId(postId) })
    //     .then(post => {
    //         if (!post) {
    //             callback(error => new NotFoundError)
    //         }
    //     })
    //     .catch(error => callback(new SystemError(error.message)))
    // // console.log('Post found: ', post)
    // if (!post) throw new Error('post not found')

    // if (post.author !== sessionStorage.userId) throw new Error('post does not belong to user')

    // post.caption = newCaption

    // db.posts.updateOne(post)
}

export default editPostText
