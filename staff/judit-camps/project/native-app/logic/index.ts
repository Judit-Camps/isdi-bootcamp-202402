import registerUser from "./registerUser"
import registerOrg from "./registerOrg"

import loginUser from "./loginUser"
import isUserLoggedIn from "./isUserLoggedIn"
import logOutUser from "./logOutUser"

import getLoggedInUserId from "./getLoggedInUserId"
import retrieveUser from "./retrieveUser"
import getUserRole from "./getUserRole"

import createEvent from "./createEvent"
import findEvents from "./findEvents"
import deleteEvent from "./deleteEvent"

import saveEvent from "./saveEvent"
import removeEvent from "./removeEvent"

import retrieveSavedEvents from "./retrieveSavedEvents"

const logic = {
    registerUser,
    registerOrg,
    loginUser,
    isUserLoggedIn,
    retrieveUser,
    logOutUser,
    getUserRole,
    createEvent,
    retrieveSavedEvents,
    findEvents,
    getLoggedInUserId,
    deleteEvent,
    saveEvent,
    removeEvent
}

export default logic