import { validate, errors } from 'com'

function savePostInfo(image, caption) {
    validateUrl(image, 'the url')
    const post = {
        author: sessionStorage.userId,
        image: image,
        caption: caption,
        date: new Date().toLocaleDateString('en-CA')
    }
    db.posts.insertOne(post)
}


export default savePostInfo