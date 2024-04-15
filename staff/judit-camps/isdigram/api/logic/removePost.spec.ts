// @ts-nocheck
import { MongoClient, ObjectId } from 'mongodb'
import logic from './index.ts'
import { expect } from 'chai'
import { errors } from 'com'

const { CredentialsError, NotFoundError } = errors

describe('removePost', () => {
    let client, users, posts

    before(done => {
        client = new MongoClient('mongodb://localhost:27017')

        client.connect()
            .then(connection => {
                const db = connection.db('test')

                users = db.collection('users')
                posts = db.collection('posts')

                logic.users = users
                logic.posts = posts

                done()
            })
            .catch(done)
    })

    it('creates post with image and text from existing user', done => {
        users.deleteMany()
            .then(() => {
                posts.deleteMany()
                    .then(() => {
                        users.insertOne({ name: "Pepe Roni", birthdate: "2000-01-01", email: "pepe@roni.com", username: "peperoni", password: "123qwe123" })
                            .then(result => {
                                const insertedPost = { author: result.insertedId, image: `http://images.com/post`, text: `hello post`, date: new Date }

                                posts.insertOne(insertedPost)
                                    .then(result2 => {
                                        debugger
                                        logic.removePost(result.insertedId.toString(), result2.insertedId.toString(), error => {
                                            if (error) {
                                                done(error)
                                                return
                                            }

                                            posts.findOne({})
                                                .then(post => {
                                                    try {
                                                        expect(post).to.be.null

                                                        done()
                                                    } catch (error) {
                                                        done(error)
                                                    }
                                                })
                                                .catch(done)
                                        })


                                    })
                                    .catch(done)

                            })
                            .catch(done)
                    })
                    .catch(done)

            })
            .catch(done)
    })

    after(done => {
        client.close()
            .then(() => done())
            .catch(done)
    })
})