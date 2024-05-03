// @ts-nocheck
import { validate, errors } from "../com/index.js"
import AsyncStorage from "@react-native-async-storage/async-storage"

function loginUser(username: string, password: string) {
    validate.text(username, "username", true)
    validate.password(password)

    const user = { username, password }
    const json = JSON.stringify(user)

    return fetch(`${process.env.EXPO_PUBLIC_API_URL}/users/auth`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: json
    })
        .then(res => {
            if (res.status === 200)
                return res.json()
                    .then(token => {
                        AsyncStorage.setItem("token", token)
                    })

            return res.json()
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
        .catch(error => {
            throw error
        })
}

export default loginUser