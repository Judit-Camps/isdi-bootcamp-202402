// @ts-nocheck
import db from "../data/index.ts"

// constants
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/
const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[A-Za-z])[A-Za-z0-9]+$/
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const URL_REGEX = /^(http|https):\/\//


// helpers
function validateText(text, explanation, checkEmptyInside?) {
    if (typeof text !== 'string') throw new TypeError(explanation + ' ' + text + ' is not a string')
    if (!text.trim().length) throw new Error(explanation + ' >' + text + '< is empty or blank')

    if (checkEmptyInside) {
        if (text.includes(' ')) throw new Error(explanation + ' ' + text + 'has empty spaces')
    }
}

function validateDate(date, explanation) {
    if (typeof date !== 'string') throw new TypeError(explanation + ' ' + date + ' is not a valid date')
    if (!DATE_REGEX.test(date)) throw new Error(explanation + ' ' + date + ' does not have a valid format')
}

function validateEmail(email, explanation = 'email') {
    if (!EMAIL_REGEX.test(email)) throw new Error(`${explanation} is not a correct email`)
}

function validateUrl(url, explanation) {
    if (!URL_REGEX.test(url)) throw new Error(explanation + ' ' + url + ' is not a correct url path')
}

function validatePassword(password, explanation = 'password') {
    if (!PASSWORD_REGEX.test(password)) throw new Error(`${explanation} is not acceptable`)
}

function validateCallback(callback, explain = 'callback') {
    if (typeof callback !== 'function') throw new TypeError(`${explain} is not a function`)
}


// logic
function registerUser(name, birthdate, email, username, password, callback) {
    validateText(name, 'name')
    validateDate(birthdate, 'birthdate')
    validateEmail(email)
    validateText(username, 'username', true)
    validatePassword(password)
    validateCallback(callback)

    db.users.findOne(user => user.email === email || user.username === username, (error, user) => {
        if (error) {
            callback(error)
            return
        }

        if (user) {
            callback(new Error('user already exists'))

            return
        }

        user = {
            name: name.trim(),
            birthdate: birthdate,
            email: email,
            username: username,
            password: password,
            status: 'offline'
        }

        db.users.insertOne(user, error => {
            if (error) {
                callback(error)
                return
            }

            callback(null)
        })
    })
}


function loginUser(username, password, callback) {
    validateText(username, 'username', true)
    validatePassword(password)
    validateCallback(callback)

    db.users.findOne(user => user.username === username, (error, user) => {
        if (error) {
            callback(error)
            return
        }

        if (!user) {
            callback(new Error('user not found'))
            return
        }

        if (user.password !== password) {
            callback(new Error('wrong password'))
            return
        }

        user.status = 'online'

        db.users.updateOne(user2 => user2.id === user.id, user, error => {
            if (error) {
                callback(error)
                return
            }

            callback(null, user.id)
        })
    })


}


function getUser(userId, callback) {
    validateText(userId, 'userId', true)
    validateCallback(callback)

    db.users.findOne(user => user.id === userId, (error, user) => {
        if (error) {
            callback(error)
            return
        }

        if (!user) {
            callback(new Error('user not found'))
            return
        }

        delete user.id
        delete user.password
        delete user.status

        callback(null, user)
    })
}


function retrieveUsers(callback) {
    validateCallback(callback)

    db.users.getAll((error, users) => {
        if (error) {
            callback(error)
            return
        }

        // HOW TO: sessionStorage get id
        // const indexToDelete = users.findIndex(user => user.id === sessionStorage.userId)

        // users.splice(indexToDelete, 1)

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

        callback(null, users)
    })

}

// function that deletes the actual user by clearing the sessionStorage
function logoutUser(userId, callback) {
    validateText(userId, 'userId', true)
    validateCallback(callback)

    db.users.findOne(user => user.id === userId, (error, user) => {
        if (error) {
            callback(error)
            return
        }

        if (!user) {
            callback(new Error('user to logout not found'))
            return
        }

        user.status = 'offline'

        db.users.updateOne(user2 => user2.id === user.id, user, (error) => {
            if (error) {
                callback(error)
                return
            }
            callback(null, user)
        })
    })
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