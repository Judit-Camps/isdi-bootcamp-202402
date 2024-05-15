// @ts-nocheck
import { validate, errors } from "../com/index.js"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { decode } from 'base-64'


function retrieveSavedEvents() {
    return AsyncStorage.getItem('token')
        .then(token => {
            validate.token(token)

            const [, payloadB64] = token.split(".")

            const payloadJSON = decode(payloadB64)

            const payload = JSON.parse(payloadJSON)

            const { sub: userId } = payload

            return fetch(`${process.env.EXPO_PUBLIC_API_URL}/users/${userId}/savedEvents`, {
                headers: {
                    "Authorization": `Bearer ${token}`
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

export default retrieveSavedEvents