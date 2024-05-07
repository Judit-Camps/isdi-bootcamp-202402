import registerUser from "./registerUser.ts"
import authenticateUser from "./authenticateUser.ts"
import retrieveUser from "./retrieveUser.ts"

import registerOrg from "./registerOrg.ts"
import authenticateOrg from "./authenticateOrg.ts"
import authenticate from "./authenticate.ts"

import createEvent from "./createEvent.ts"
import retrieveEventsByAuthor from "./retrieveEventsByAuthor.ts"

import findEvents from "./findEvents.ts"
import deleteEvent from "./deleteEvent.ts"

import saveEvent from "./saveEvent.ts"
import removeEvent from "./removeEvent.ts"
import retrieveSavedEvents from "./retrieveSavedEvents.ts"


const logic = {
    registerUser,
    authenticateUser,
    retrieveUser,

    registerOrg,
    authenticateOrg,
    authenticate,

    createEvent,
    retrieveEventsByAuthor,

    findEvents,
    deleteEvent,

    saveEvent,
    removeEvent,
    retrieveSavedEvents
}

export default logic