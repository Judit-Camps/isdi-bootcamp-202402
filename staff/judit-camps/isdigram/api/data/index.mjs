import Collection from "./Collection.js"
var db = {
    users: new Collection('users'),
    posts: new Collection('posts'),
    chats: new Collection('chats')
}

export default db
