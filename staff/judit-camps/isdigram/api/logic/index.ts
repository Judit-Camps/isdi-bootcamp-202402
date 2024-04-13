// @ts-nocheck
import registerUser from './registerUser.ts'
import loginUser from './loginUser.ts'
import retrieveUser from './retrieveUser.ts'
import logoutUser from './logoutUser.ts'

import savePostInfo from './savePostInfo.ts'
import editPostText from './editPostText.ts'
import retrievePostsLatestFirst from './retrievePosts.ts'
import removePost from './removePost.ts'

import { validate, errors } from 'com'



function getLoggedInUser() {
    return sessionStorage.userId
}

function isUserLoggedIn() {
    return !!sessionStorage.userId
}

function cleanUpLoggedInUser() {
    delete sessionStorage.userId
}


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
    users: null,
    registerUser,
    loginUser,
    retrieveUser,
    logoutUser,
    getLoggedInUser,
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