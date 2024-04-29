// @ts-nocheck
import { util, validate } from "../com/index.js"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { decode } from 'base-64'

function getUserRole() {
    return AsyncStorage.getItem("token")
        .then(token => {
            // if (!token || typeof token !== "string") {
            //     return { role: "guest" }
            // }
            const [, payloadB64] = token.split(".")
            const payloadJSON = decode(payloadB64)
            const payload = JSON.parse(payloadJSON)

            const { role: role } = payload

            return (role)
        })
        .catch(error => {
            console.error("Error while retrieving user role:", error)
            return { role: "guest" }
        });

}


export default getUserRole