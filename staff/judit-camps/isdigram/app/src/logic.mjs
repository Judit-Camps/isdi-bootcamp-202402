import db from "./data/index.mjs"

// constants
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/
const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[A-Za-z])[A-Za-z0-9]+$/
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const URL_REGEX = /^(http|https):\/\//

// helpers
function validateText(text, explanation = 'text', checkEmptyInside) {
    if (typeof text !== 'string') throw new Error(explanation + ' ' + text + ' is not a string')
    if (!text.trim().length) throw new Error(explanation + ' >' + text + '< is empty or blank')

    if (checkEmptyInside) {
        if (text.includes(' ')) throw new Error(explanation + ' ' + text + 'has empty spaces')
    }
}

function validateDate(date, explanation = 'date') {
    if (typeof date !== 'string') throw new TypeError(`${explanation} is not a string`)
    if (!DATE_REGEX.test(date)) throw new Error(`${explanation} is not a valid date`)
}

function validateEmail(email, explanation = 'email') {
    if (!EMAIL_REGEX.test(email)) throw new Error(`${explanation} is not an email`)
}

function validateUrl(url, explanation = 'url') {
    if (!URL_REGEX.test(url)) throw new Error(`${explanation} is not a url`)
}

function validatePassword(password, explanation = 'password') {
    if (!PASSWORD_REGEX.test(password)) throw new Error(`${explanation} is not valid`)
}

function validateCallback(callback, explanation = 'callback') {
    if (typeof callback !== 'function') throw new TypeError(`${explanation} is not a function`)
}

// logic
function registerUser(name, birthdate, email, username, password, callback) {
    validateText(name, 'name')
    validateDate(birthdate, 'birthdate')
    validateEmail(email)
    validateText(username, 'username', true)
    validatePassword(password)
    validateCallback(callback)

    const xhr = new XMLHttpRequest

    xhr.onload = function () {
        const { status, responseText: json } = xhr

        if (status >= 500) {
            callback(new Error('system error'))
            return
        } else if (status >= 400) {
            const { error, message } = JSON.parse(json)

            // to grab the selected type of error and use it to send the message
            const constructor = window[error]

            callback(new constructor(message))
        } else if (status >= 300) {
            callback(new Error('system error'))
            return
        } else callback(null)
    }

    xhr.open('POST', 'http://localhost:8080/users')

    xhr.setRequestHeader('Content-Type', 'application/json')

    const user = { name, birthdate, email, username, password }

    const json = JSON.stringify(user)

    xhr.send(json)
}


function loginUser(username, password, callback) {
    validateText(username, 'username', true)
    validatePassword(password)
    validateCallback(callback)

    const xhr = new XMLHttpRequest

    xhr.onload = function () {
        const { status, responseText: json } = xhr

        if (status >= 500) {
            callback(new Error('system error'))
            return
        } else if (status >= 400) {
            const { error, message } = JSON.parse(json)

            const constructor = window[error]

            callback(new constructor(message))
        } else if (status >= 300) {
            callback(new Error('system error'))
            return
        } else {
            const userId = JSON.parse(json)
            sessionStorage.userId = userId

            callback(null)
        }
    }

    xhr.open('POST', 'http://localhost:8080/users/auth')

    xhr.setRequestHeader('Content-Type', 'application/json')

    const user = { username, password }

    const json = JSON.stringify(user)

    xhr.send(json)

}


function getUser(callback) {
    validateCallback(callback)

    console.log('logic app -> ')

    var xhr = new XMLHttpRequest

    xhr.onload = function () {
        const { status, responseText: json } = xhr

        if (status >= 500) {
            callback(new Error('system error'))

            return
        } else if (status >= 400) {
            const { error, message } = JSON.parse(json)

            const constructor = window[error]

            callback(new constructor(message))
        } else if (status >= 300) {
            callback(new Error('system error'))

            return
        } else {
            const user = JSON.parse(json)

            callback(null, user)
        }
    }

    xhr.open('GET', `http://localhost:8080/users/${sessionStorage.userId}`)

    xhr.send()
}

function retrieveUsers() {
    const users = db.users.getAll()

    const indexToDelete = users.findIndex(user => user.id === sessionStorage.userId)

    users.splice(indexToDelete, 1)

    users.forEach(user => {
        delete user.password
        delete user.email
        delete user.birthdate
        delete user.name
    })

    users.sort(function (a, b) {
        return a.username < b.username ? -1 : 1
    }).sort(function (a, b) {
        return a.status > b.status ? -1 : 1
    })

    return users
}

// function that deletes the actual user by clearing the sessionStorage
function logoutUser() {
    const user = db.users.findOne(function (user) {
        return user.id === sessionStorage.userId
    })

    if (!user) throw new Error('wrong credentials')

    user.status = 'offline'

    db.users.updateOne(user)

    delete sessionStorage.userId
}

function getLoggedInUser() {
    return sessionStorage.userId
}

function isUserLoggedIn() {
    return !!sessionStorage.userId
}

function cleanUpLoggedInUser() {
    delete sessionStorage.userId
}

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

function retrievePostsLatestFirst() {
    const posts = db.posts.getAll()

    posts.forEach(function (post) {
        const user = db.users.findOne(user => user.id === post.author)
        post.author = { id: user.id, username: user.username }
    })

    return posts.slice().reverse()
}

function removePost(postId) {
    const post = db.posts.findOne(post => post.id === postId)

    if (!post) throw new Error('post not found')

    if (post.author !== sessionStorage.userId) throw new Error('post does not belong to user')

    db.posts.deleteOne(post => post.id === postId)
}

function editPostText(postId, newCaption) {
    // console.log("Received postId:", postId);
    const post = db.posts.findOne(post => post.id === postId)
    // console.log('Post found: ', post)
    if (!post) throw new Error('post not found')

    if (post.author !== sessionStorage.userId) throw new Error('post does not belong to user')

    post.caption = newCaption

    db.posts.updateOne(post)
}

function sendMessageTo(userId, text) {
    validateText(userId, 'userId', true)
    validateText(text, 'text')

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
    validateText(userId, 'userId', true)

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