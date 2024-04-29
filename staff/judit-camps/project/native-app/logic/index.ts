import registerUser from "./registerUser"
import registerOrg from "./registerOrg"
import loginUser from "./loginUser"
import isUserLoggedIn from "./isUserLoggedIn"
import retrieveUser from "./retrieveUser"
import logOutUser from "./logOutUser"
import getUserRole from "./getUserRole"

const logic = {
    registerUser,
    registerOrg,
    loginUser,
    isUserLoggedIn,
    retrieveUser,
    logOutUser,
    getUserRole
}

export default logic