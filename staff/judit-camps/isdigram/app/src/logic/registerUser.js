import { validate, errors } from 'com'


// logic
function registerUser(name, birthdate, email, username, password, callback) {
    validate.text(name, 'name')
    validate.date(birthdate, 'birthdate')
    validate.email(email)
    validate.text(username, 'username', true)
    validate.password(password)
    validate.callback(callback)

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        const { status, responseText: json } = xhr

        if (status == 201) {
            callback(null)

            return
        }

        const { error, message } = JSON.parse(json)

        const constructor = errors[error]
        callback(new constructor(message))
    }

    xhr.open('POST', 'http://localhost:8080/users')

    xhr.setRequestHeader('Content-Type', 'application/json')

    const user = { name, birthdate, email, username, password }

    const json = JSON.stringify(user)

    xhr.send(json)
}


export default registerUser