function registerUser(name, birthdate, email, username, password) {
    var exists = users.some(function (user) {
        return user.email === email || user.username === username
    })

    if (exists) throw new Error('user already exists')

    var user = {
        name: name,
        birthdate: birthdate,
        email: email,
        username: username,
        password: password
    }
    users.push(user)

    localStorage.users = JSON.stringify(users)
}


function loginUser(username, password) {
    var matched = users.some(function (user) {
        return user.username === username && user.password === password
    })
    if (!matched) {
        throw new Error('wrong credentials')
    }

    sessionStorage.username = username
}