import registerUser from "./registerUser.ts"
import authenticateUser from "./authenticateUser.ts"
import retrieveUser from "./retrieveUser.ts"

import registerOrg from "./registerOrg.ts"
import authenticateOrg from "./authenticateOrg.ts"
import authenticate from "./authenticate.ts"

import createEvent from "./createEvent.ts"
import retrieveEvents from "./retrieveEvents.ts"
import retrieveEventsByAuthor from "./retrieveEventsByAuthor.ts"

import findEvents from "./findEvents.ts"
import deleteEvent from "./deleteEvent.ts"

import saveEvent from "./saveEvent.ts"
import removeEvent from "./removeEvent.ts"

const logic = {
    registerUser,
    authenticateUser,
    retrieveUser,

    registerOrg,
    authenticateOrg,
    authenticate,

    createEvent,
    retrieveEvents,
    retrieveEventsByAuthor,

    findEvents,
    deleteEvent,

    saveEvent,
    removeEvent
}

export default logic