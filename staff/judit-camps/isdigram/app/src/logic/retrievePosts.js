import { validate, errors } from 'com'

function retrievePostsLatestFirst(callback) {
    validate.callback(callback)

    var xhr = new XMLHttpRequest

    xhr.onload = function () {
        const { status, responseText: json } = xhr

        if (status >= 500) {
            callback(new Error('system error'))
            return
        } else if (status >= 400) {
            const { error, message } = JSON.parse(json)

            const constructor = errors[error]

            callback(new constructor(message))
        } else if (status >= 300) {
            callback(new Error('system error'))
            return
        } else {
            const posts = JSON.parse(json)
            callback(null, posts)
        }
    }

    xhr.open('GET', `http://localhost:8080/posts`)

    xhr.setRequestHeader('Authorization', sessionStorage.userId)

    xhr.send()

}

export default retrievePostsLatestFirst