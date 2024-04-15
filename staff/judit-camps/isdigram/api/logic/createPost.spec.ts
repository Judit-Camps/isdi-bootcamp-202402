// @ts-nocheck
import { MongoClient, ObjectId } from 'mongodb'
import logic from './index.ts'
import { expect } from 'chai'
import { errors } from 'com'

const { CredentialsError, NotFoundError } = errors

describe('createPost', () => {
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
                                logic.createPost(result.insertedId.toString(), 'http://images.com/lala', 'this is a new post', error => {
                                    if (error) {
                                        done(error)
                                        return
                                    }

                                    posts.findOne({})
                                        .then(post => {
                                            try {
                                                expect(post.author.toString()).to.equal(result.insertedId.toString())
                                                expect(post.image).to.equal('http://images.com/lala')
                                                expect(post.text).to.equal('this is a new post')
                                                expect(post.date).to.be.instanceOf(Date)

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

    after(done => {
        client.close()
            .then(() => done())
            .catch(done)
    })
})