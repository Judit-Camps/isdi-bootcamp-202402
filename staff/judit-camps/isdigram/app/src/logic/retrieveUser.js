import { validate, errors } from 'com'

function retrieveUser(callback) {
    validate.callback(callback)

    var xhr = new XMLHttpRequest

    xhr.onload = () => {
        const { status, responseText: json } = xhr

        if (status == 200) {
            const user = JSON.parse(json)

            callback(null, user)

            return
        }

        const { error, message } = JSON.parse(json)

        const constructor = errors[error]

        callback(new constructor(message))
    }

    xhr.open('GET', `http://localhost:8080/users/${sessionStorage.userId}`)

    xhr.setRequestHeader('Authorization', sessionStorage.userId)

    xhr.send()
}

export default retrieveUser