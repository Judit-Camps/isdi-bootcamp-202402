import { validate, errors } from 'com'

function createPost(image, caption) {
    validate.url(image, 'image url')
    if (caption) {
        validate.text(caption, 'image text')
    }

    const post = { image, caption }

    const json = JSON.stringify(post)

    return fetch('http://localhost:8080/posts', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: json
    })
        .then(res => {
            if (res.status === 201) return

            return res.json()
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}


export default createPost