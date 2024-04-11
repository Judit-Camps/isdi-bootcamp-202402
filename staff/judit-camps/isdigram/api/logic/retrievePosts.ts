import { ObjectId } from "mongodb"
import { validate, errors } from "com"

const { DuplicityError, SystemError } = errors

function retrievePostsLatestFirst(userId, callback) {
    // validate.text(userId, 'userId', true)
    // validate.callback(callback)

    // db.users.findOne(user => user.id === userId, (error, user) => {
    //     if (error) {
    //         callback(error)
    //         return

    //     }
    //     if (!user) {
    //         callback(new Error('user not found'))
    //         return
    //     }

    //     db.posts.getAll((error, posts) => {
    //         if (error) {
    //             callback(error)
    //             return
    //         }

    //         let count = 0
    //         let errorDetected = false

    //         posts.forEach(post => {
    //             db.users.findOne(user => user.id === post.author, (error, user) => {
    //                 if (error) {
    //                     callback(error)
    //                     return
    //                 }

    //                 if (!user) {
    //                     callback(new Error('post owner not found'))

    //                     errorDetected = true

    //                     return
    //                 }

    //                 post.author = {
    //                     id: user.id,
    //                     username: user.username
    //                 }

    //                 count++

    //                 if (!errorDetected && count === posts.length) {
    //                     callback(null, posts.reverse())
    //                 }
    //             })
    //         })
    //     })
    // })
}
export default retrievePostsLatestFirst
