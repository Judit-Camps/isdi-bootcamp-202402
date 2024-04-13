import { validate, errors } from "com"

const { CredentialsError, SystemError, NotFoundError } = errors


function loginUser(username: string, password: string, callback: Function) {
    validate.text(username, 'username', true)
    validate.password(password)
    validate.callback(callback)

    this.users.findOne({ username: username })
        .then(user => {
            if (!user) {
                callback(new NotFoundError('user not found'))
                return
            }
            if (user.password !== password) {
                callback(new CredentialsError('wrong password'))
                return
            }

            this.users.updateOne({ _id: user._id }, { $set: { status: 'online' } })
                .then(() => { callback(null, user._id.toString()) })
                .catch(error => { callback(new SystemError(error.message)) })


        })
        .catch(error => callback(new SystemError(error.message)))
}



export default loginUser