import { validate, errors } from 'com'

function loginUser(username, password, callback) {
    validate.text(username, 'username', true)
    validate.password(password)
    validate.callback(callback)

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        const { status, responseText: json } = xhr

        if (status == 200) {
            const userId = JSON.parse(json)

            sessionStorage.userId = userId

            callback(null)

            return
        }
        const { error, message } = JSON.parse(json)

        const constructor = errors[error]

        callback(new constructor(message))
    }

    xhr.open('POST', 'http://localhost:8080/users/auth')

    xhr.setRequestHeader('Content-Type', 'application/json')

    const user = { username, password }

    const json = JSON.stringify(user)

    xhr.send(json)

}

export default loginUser