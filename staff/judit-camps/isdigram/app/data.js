// DATA
var data = (function () {
    function findUser(callback) {
        // save the actual users passing them from string to an array. 
        // if there are still no users => []
        var users = JSON.parse(localStorage.users || '[]')

        // get the user that we are looking for
        var user = users.find(callback)

        return user
    }

    function insertUser(user) {
        // get the users we have now as an array
        var users = JSON.parse(localStorage.users || '[]')

        // push the new user into the array
        users.push(user)

        // convert users array to string and save it in the localStorage
        localStorage.users = JSON.stringify(users)
    }

    function insertPost(post) {
        var posts = JSON.parse(localStorage.posts || '[]')

        posts.push(post)

        localStorage.posts = JSON.stringify(posts)
    }

    return {
        findUser: findUser,
        insertUser: insertUser,
        insertPost: insertPost
    }

})()