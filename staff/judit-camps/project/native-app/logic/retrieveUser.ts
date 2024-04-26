// @ts-nocheck
import { validate, errors } from "com"
import AsyncStorage from "@react-native-async-storage/async-storage"

function retrieveUser() {
    return AsyncStorage.getItem('token')
        .then(token => {
            validate.token(token)

            const [, payloadB64] = sessionStorage.token.split(".")

            const payloadJSON = atob(payloadB64)

            const payload = JSON.parse(payloadJSON)

            const { sub: userId } = payload

            return fetch(`http://localhost:9000/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
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
        })



}

export default retrieveUser
