// @ts-nocheck
import AsyncStorage from "@react-native-async-storage/async-storage"
import { validate, errors } from "../com/index.js"
import { decode } from "base-64"

function removeEvent(eventId: string) {
    validate.text(eventId, "eventId", true)

    return AsyncStorage.getItem("token")
        .then(token => {

            validate.token(token)

            return fetch(`${process.env.EXPO_PUBLIC_API_URL}/user/savedEvents/${eventId}`, {
                method: "DELETE",
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
                .then(res => {
                    if (res.status === 200) return

                    return res.json()
                        .then(body => {
                            const { error, message } = body

                            const constructor = errors[error]

                            throw new constructor(message)
                        })
                })
        })

}

export default removeEvent