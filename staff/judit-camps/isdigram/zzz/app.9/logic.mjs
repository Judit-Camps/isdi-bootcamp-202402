import db from "./data/index.mjs"

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/
const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[A-Za-z])[A-Za-z0-9]+$/
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const URL_REGEX = /^(http|https):\/\//

// helpers
function validateDate(date, explanation) {
    if (!DATE_REGEX.test(date)) throw new Error(explanation + ' ' + date + ' is not a valid date')
}

function validateText(text, explanation, checkEmptyInside) {
    if (typeof text !== 'string') throw new Error(explanation + ' ' + text) + ' is not a string'
    if (!text.trim().length) throw new Error(explanation + ' >' + text + '< is empty or blank')

    if (checkEmptyInside) {
        if (text.includes(' ')) throw new Error(explanation + ' ' + text + 'has empty spaces')
    }
}

function validateEmail(email, explanation) {
    if (!EMAIL_REGEX.test(email)) throw new Error(explanation + ' ' + email + ' is not a correct email')
}

function validateUrl(url, explanation) {
    if (!URL_REGEX.test(url)) throw new Error(explanation + ' ' + url + ' is not a correct url path')
}

function validatePassword(password, explanation) {
    if (!PASSWORD_REGEX.test(password)) throw new Error(explanation + ' ' + password + ' is not acceptable')
}

// logic
function registerUser(name, birthdate, email, username, password) {
    validateText(name, 'the name')
    validateDate(birthdate)
    validateEmail(email, 'the email')
    validateText(username, 'the username', true)
    validatePassword(password, 'the password')

    let user = db.users.findOne(user => user.email === email || user.username === username)

    if (user) throw new Error('user already exists')

    user = {
        name: name,
        birthdate: birthdate,
        email: email,
        username: username,
        password: password
    }

    db.users.insertOne(user)
}


function loginUser(username, password) {
    const user = db.users.findOne(user => user.username === username && user.password === password)

    if (!user) throw new Error('wrong credentials')

    user.status = 'online'

    db.users.updateOne(user)

    sessionStorage.userId = user.id
}


function getUser() {
    const user = db.users.findOne(user => user.id === sessionStorage.userId)

    if (!user) throw new Error('user not found')

    return user
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
        return a.status > b.status ? -1 : 1

    })
    users.sort(function (a, b) {
        return a.username < b.username ? -1 : 1
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