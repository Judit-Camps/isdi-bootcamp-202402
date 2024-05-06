// @ts-nocheck
import { util, validate, errors } from "../com/index.js"
const { SystemError } = errors
import AsyncStorage from "@react-native-async-storage/async-storage"
import { decode } from 'base-64'


function getLoggedInUserId(): Promise<string> {
    return AsyncStorage.getItem("token")
        .catch(error => { throw new SystemError(error.message) })
        .then(token => {
            const [, payloadB64] = token.split(".")
            const payloadJSON = decode(payloadB64)
            const payload = JSON.parse(payloadJSON)

            const { sub: userId } = payload

            return userId
        })

}

export default getLoggedInUserId