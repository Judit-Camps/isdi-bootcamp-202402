// @ts-nocheck
import { errors } from "../com/index.js"

function retrieveOrgs() {

    return fetch(`${process.env.EXPO_PUBLIC_API_URL}/organizations`, {})
        .then(res => {
            if (res.status === 200)
                return res.json()

            return res.json()
                .then(body => {
                    const { error, message } = body
                    const constructor = errors[error]
                    throw new constructor(message)
                })
        })
}



export default retrieveOrgs
