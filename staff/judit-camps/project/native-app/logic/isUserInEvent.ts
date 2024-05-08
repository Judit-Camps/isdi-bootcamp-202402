// @ts-nocheck
import AsyncStorage from "@react-native-async-storage/async-storage"
import { validate, errors } from "../com/index.js"
import { decode } from 'base-64'

const { SystemError } = errors

function isUserInEvent(ev) {
    return AsyncStorage.getItem("token")
        .catch(error => { throw new SystemError(error.message) })
        .then(token => {
            validate.token(token)

            const [, payloadB64] = token.split(".")
            const payloadJSON = decode(payloadB64)
            const payload = JSON.parse(payloadJSON)

            const { sub: userId } = payload
            console.log(userId)
            console.log(ev)

            return ev.attendees.some(attendee => attendee.id === userId)
        })

}

export default isUserInEvent