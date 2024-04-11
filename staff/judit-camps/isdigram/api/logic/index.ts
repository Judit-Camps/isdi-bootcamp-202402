// @ts-nocheck

import { ObjectId } from "mongodb"
import { validate, errors } from "com"

const { DuplicityError, SystemError } = errors


function registerUser(name: string, birthdate: string, email: string, username: string, password: string, callback: Function) {
    validate.text(name, 'name')
    validate.date(birthdate, 'birthdate')
    validate.email(email)
    validate.text(username, 'username', true)
    validate.password(password)
    validate.callback(callback)

    this.users.findOne({ $or: [{ email }, { username }] })
        .then(user => {
            if (user) {
                callback(new DuplicityError('user already exists'))

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

            this.users.insertOne(user)
                .then(() => callback(null))
                .catch(error => callback(new SystemError(error.message)))

        })
        .catch(error => callback(new SystemError(error.message)))
}


function loginUser(username: string, password: string, callback: Function) {
    validate.text(username, 'username', true)
    validate.password(password)
    validate.callback(callback)

    this.users.findOne({ username: username })
        .then(user => {
            if (!user) {
                callback(new Error('user not found'))
                return
            }
            if (user.password !== password) {
                callback(new Error('wrong password'))
                return
            }

            const userId = user._id

            this.users.updateOne({ _id: new ObjectId(userId) }, { $set: { status: 'online' } })
                .then(() => { callback(null, userId.toString()) })
                .catch(error => { callback(error) })


        })
        .catch(error => callback(error))
}


function getUser(userId: string, targetUserId: string, callback: Function) {
    validate.text(userId, 'userId', true)
    validate.text(targetUserId, 'targetUserId', true)
    validate.callback(callback)

    this.users.findOne({ _id: userId })
        .then(user => {
            if (!user) {
                callback(new Error('user not found'))

                return
            }

            this.user.findOne({ _id: new ObjectId(targetUserId) })
                .then(user => {
                    if (!user) {
                        callback(new Error('user not found'))

                        return
                    }
                    delete user._id
                    delete user.password
                    delete user.status
                    callback(null, user)
                })
                .catch(error => callback(error))
        })
        .catch(error => callback(error))
}


function retrieveUsers(callback) {
    validate.callback(callback)

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
    // validate.text(userId, 'userId', true)
    validate.callback(callback)

    this.users.findOne({ _id: userId })
        .then(user => {
            if (!user) {
                callback(new Error('user to logout not found'))
                return
            }

            this.users.updateOne({ _id: new ObjectId(userId) }, { $set: { status: 'offline' } })
                .then(() => {
                    callback(null, user)

                })
                .catch(error => callback(error))
        })
        .catch(error => callback(error))
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

function retrievePostsLatestFirst(userId, callback) {
    validate.text(userId, 'userId', true)
    validate.callback(callback)

    db.users.findOne(user => user.id === userId, (error, user) => {
        if (error) {
            callback(error)
            return

        }
        if (!user) {
            callback(new Error('user not found'))
            return
        }

        db.posts.getAll((error, posts) => {
            if (error) {
                callback(error)
                return
            }

            let count = 0
            let errorDetected = false

            posts.forEach(post => {
                db.users.findOne(user => user.id === post.author, (error, user) => {
                    if (error) {
                        callback(error)
                        return
                    }

                    if (!user) {
                        callback(new Error('post owner not found'))

                        errorDetected = true

                        return
                    }

                    post.author = {
                        id: user.id,
                        username: user.username
                    }

                    count++

                    if (!errorDetected && count === posts.length) {
                        callback(null, posts.reverse())
                    }
                })
            })
        })
    })
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