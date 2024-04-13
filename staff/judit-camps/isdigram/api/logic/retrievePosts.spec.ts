import { MongoClient, ObjectId } from "mongodb";
import logic from "./index.ts";
import { expect } from "chai";
import { errors } from "com";

const { CredentialsError, NotFoundError } = errors

describe('retrievePosts', () => {
    let client, users, posts

    before(done => {
        client = new MongoClient('mongodb://localhost:27017')

        client.connect()
            .then(connection => {
                const db = connection.db('test')

                users = db.collection('users')
                posts = db.collection('posts')

                logic.users = users
                // logic.posts = posts

                done()

            })
            .catch(done)
    })

    it('should retrieve all posts', done => {
        users.deleteMany()
            .then(() => {
                posts.deleteMany()
                    .then(() => {
                        users.insertOne({ name: 'Pepe Roni', birthdate: '2000-01-01', email: 'pepe@roni.com', username: 'peperoni', password: '123qwe123' })
                            .then(result => {
                                const insertedPosts = []
                                let count = 1
                                const insertedPost1 = { author: result.insertedId, image: `http://images.com/${count}`, text: `hello post ${count}`, date: new Date }


                            })
                            .catch(done)
                    })
                    .catch(done)
            })
            .catch(done)


    })

    // it('fails on post with no author', done => {

    // })
})