import { validate, errors } from 'com'

function savePostInfo(image, caption) {
    validate.url(image, 'image url')
    if (caption) {
        validate.text(caption, 'image text')
    }

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        const { status, responseText: json } = xhr

        if (status == 201) {
            cancelIdleCallback(null)

            return
        }

        const { error, message } = JSON.parse(json)

        const constructor = errors[error]

        cancelIdleCallback(new constructor(message))
    }

    xhr.open('POST', 'http://localhost:8080/posts')

    xhr.setRequestHeader('Authorization', sessionStorage.userId)
    xhr.setRequestHeader('Content-Type', 'application/json')

    const post = { image, text }

    const json = JSON.stringify(post)

    xhr.send()


}


export default savePostInfo