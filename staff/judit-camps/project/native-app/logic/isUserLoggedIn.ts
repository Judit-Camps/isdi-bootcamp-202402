import { validate } from "../com/index.js"
import AsyncStorage from "@react-native-async-storage/async-storage"

function isUserLoggedIn() {
    const token = AsyncStorage.getItem('token')
    try {
        validate.token(token)
        return !!token

    } catch (error) {
        return false
    }
}

export default isUserLoggedIn