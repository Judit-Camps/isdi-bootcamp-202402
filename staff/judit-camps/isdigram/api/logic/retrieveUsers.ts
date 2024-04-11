// @ts-nocheck

import { ObjectId } from "mongodb"
import { validate, errors } from "com"

const { DuplicityError, SystemError } = errors


function retrieveUsers(callback) {
    validate.callback(callback)

    db.users.getAll((error, users) => {
        if (error) {
            callback(error)
            return
        }

        // HOW TO: sessionStorage get id
        // const indexToDelete = users.findIndex(user => user.id === sessionStorage.userId)

        // users.splice(indexToDelete, 1)

        users.forEach(user => {
            delete user.password
            delete user.email
            delete user.birthdate
            delete user.name
        })

        users.sort(function (a, b) {
            return a.status > b.status ? -1 : 1

        })
        users.sort(function (a, b) {
            return a.username < b.username ? -1 : 1
        })

        callback(null, users)
    })

}

export default retrieveUsers