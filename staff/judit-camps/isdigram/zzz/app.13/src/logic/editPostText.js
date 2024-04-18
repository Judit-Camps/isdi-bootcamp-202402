import { validate, errors } from 'com'


function editPostText(postId, newCaption) {
    // console.log("Received postId:", postId);
    const post = db.posts.findOne(post => post.id === postId)
    // console.log('Post found: ', post)
    if (!post) throw new Error('post not found')

    if (post.author !== sessionStorage.userId) throw new Error('post does not belong to user')

    post.caption = newCaption

    db.posts.updateOne(post)
}

export default editPostText