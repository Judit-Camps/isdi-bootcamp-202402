import registerUser from "./registerUser.ts"
import authenticateUser from "./authenticateUser.ts"
import retrieveUser from "./retrieveUser.ts"

import registerOrg from "./registerOrg.ts"
import authenticateOrg from "./authenticateOrg.ts"

import createEvent from "./createEvent.ts"

const logic = {
    registerUser,
    authenticateUser,
    retrieveUser,

    registerOrg,
    authenticateOrg,

    createEvent
}

export default logic