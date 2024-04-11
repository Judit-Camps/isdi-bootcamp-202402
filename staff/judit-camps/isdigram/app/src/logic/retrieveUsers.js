import { validate, errors } from 'com'

function retrieveUsers() {
    const users = db.users.getAll()

    const indexToDelete = users.findIndex(user => user.id === sessionStorage.userId)

    users.splice(indexToDelete, 1)

    users.forEach(user => {
        delete user.password
        delete user.email
        delete user.birthdate
        delete user.name
    })

    users.sort(function (a, b) {
        return a.username < b.username ? -1 : 1
    }).sort(function (a, b) {
        return a.status > b.status ? -1 : 1
    })

    return users
}


export default retrieveUsers