import { validate, errors } from 'com'

import registerUser from './registerUser'
import loginUser from './loginUser'
import getUser from './getUser'
import retrieveUsers from './retrieveUsers'
import logoutUser from './logoutUser'

import getLoggedInUser from './getLoggedInUser'
import isUserLoggedIn from './isUserLoggedIn'
import cleanUpLoggedInUser from './cleanUppLoggedInUser'

import savePostInfo from './savePostInfo'
import retrievePostsLatestFirst from './retrievePosts'
import removePost from './removePost'
import editPostText from './editPostText'

function sendMessageTo(userId, text) {
    validate.text(userId, 'userId', true)
    validate.text(text, 'text')

    let chat = db.chats.findOne(chat => chat.users.includes(userId) && chat.users.includes(sessionStorage.userId))

    if (!chat) {
        chat = {
            users: [sessionStorage.userId, userId],
            messages: []
        }
    }

    const message = {
        from: sessionStorage.userId,
        text: text,
        date: new Date().toISOString()
    }

    chat.messages.push(message)

    if (!chat.id)
        db.chats.insertOne(chat)
    else
        db.chats.updateOne(chat)
}

function retrieveMessagesWith(userId) {
    validate.text(userId, 'userId', true)

    const chat = db.chats.findOne(chat => chat.users.includes(userId) && chat.users.includes(sessionStorage.userId))

    if (chat)
        return chat.messages
    else
        return []
}

const logic = {
    registerUser,
    loginUser,
    getUser,
    logoutUser,
    getLoggedInUser,
    retrieveUsers,
    isUserLoggedIn,
    cleanUpLoggedInUser,

    savePostInfo,
    retrievePostsLatestFirst,
    removePost,
    editPostText,

    sendMessageTo,
    retrieveMessagesWith,
}

export default logic