import registerUser from "./registerUser.ts"
import retrieveUser from "./retrieveUser.ts"

import registerOrg from "./registerOrg.ts"
import authenticate from "./authenticate.ts"
import retrieveOrgList from "./retrieveOrgList.ts"

import createEvent from "./createEvent.ts"

import findEvents from "./findEvents.ts"
import deleteEvent from "./deleteEvent.ts"
import modifyEvent from "./modifyEvent.ts"

import saveEvent from "./saveEvent.ts"
import removeEvent from "./removeEvent.ts"
import retrieveSavedEvents from "./retrieveSavedEvents.ts"


const logic = {
    registerUser,
    retrieveUser,

    registerOrg,
    authenticate,
    retrieveOrgList,

    createEvent,

    findEvents,
    deleteEvent,
    modifyEvent,

    saveEvent,
    removeEvent,
    retrieveSavedEvents
}

export default logic