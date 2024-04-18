import { validate, errors } from 'com'

// function that deletes the actual user by clearing the sessionStorage
function logoutUser() {
    const user = db.users.findOne(function (user) {
        return user.id === sessionStorage.userId
    })

    if (!user) throw new Error('wrong credentials')

    user.status = 'offline'

    db.users.updateOne(user)

    delete sessionStorage.userId
}

export default logoutUser