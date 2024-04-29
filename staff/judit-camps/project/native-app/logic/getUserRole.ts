import { util, validate } from "../com/index.js"
import AsyncStorage from "@react-native-async-storage/async-storage"

function getUserRole() {
    const token = AsyncStorage.getItem("token")

    validate.token(token)

    const { role: role } = util.extractJwtPayload(token)

    return { role: role }

}

export default getUserRole()