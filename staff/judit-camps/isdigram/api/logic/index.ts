// @ts-nocheck
import registerUser from './registerUser.ts'
import authenticateUser from './authenticateUser.ts'
import retrieveUser from './retrieveUser.ts'

import createPost from './createPost.ts'
import editPostText from './editPostText.ts'
import retrievePostsLatestFirst from './retrievePosts.ts'
import removePost from './removePost.ts'

const logic = {
    users: null,
    posts: null,

    registerUser,
    authenticateUser,
    retrieveUser,

    createPost,
    retrievePostsLatestFirst,
    removePost,
    editPostText,
}

export default logic