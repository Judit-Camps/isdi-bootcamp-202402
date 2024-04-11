import { ObjectId } from "mongodb"
import { validate, errors } from "com"

const { DuplicityError, SystemError } = errors

function savePostInfo(image, caption) {
    // validate.url(image, 'the url')
    // const post = {
    //     author: sessionStorage.userId,
    //     image: image,
    //     caption: caption,
    //     date: new Date().toLocaleDateString('en-CA')
    // }
    // db.posts.insertOne(post)
}

export default savePostInfo
