import { MongoClient, ObjectId } from 'mongodb'
import logic from "./index.ts"

import { expect } from 'chai'

describe('loginUser', () => {
    let client, users, posts

    before(done => {
        client = new MongoClient('mongodb://localhost:27017')

        client.connect()
            .then(connection => {
                const db = connection.db('test')

                users = db.collection('users')

                logic.users = users

                done()
            })
            .catch(done)
    })


    it('succeeds on login for existing user & correct credentials', done => {
        users.deleteMany()
            .then(() => {
                users.insertOne({ name: 'Pepe Roni', birthdate: '2000-01-01', email: 'pepe@roni.com', username: 'peperoni', password: '123qwe123' })
                    .then(result => {
                        logic.loginUser('peperoni', '123qwe123', (error, userId) => {
                            if (error) {
                                done(error)

                                return
                            }

                            expect(userId).to.be.a('string')
                            expect(userId).to.equal(result.insertedId.toString())

                            users.findOne({ _id: new ObjectId(userId) })
                                .then(user => {
                                    expect(user.status).to.equal('online')

                                    done()
                                })
                                .catch(done)

                        })
                    })
                    .catch(done)
            })
            .catch(done)
    })


    it('fails on existing user and incorrect password', done => {
        users.deleteMany()
            .then(() => {
                users.insertOne({ name: 'Pepe Roni', birthdate: '2000-01-01', email: 'pepe@roni.com', username: 'peperoni', password: '123qwe123' })
                    .then(() => {
                        logic.loginUser('peperoni', '234wer234', (error, userId) => {
                            expect(error).to.be.instanceOf(Error)
                            expect(error.message).to.equal('wrong password')
                            expect(userId).to.be.undefined

                            done()
                        })
                    })
                    .catch(done)
            })
            .catch(done)
    })


    it('fails on existing user and incorrect username', done => {
        users.deleteMany()
            .then(() => {
                users.insertOne({ name: 'Pepe Roni', birthdate: '2000-01-01', email: 'pepe@roni.com', username: 'peperoni', password: '123qwe123' })
                    .then(() => {
                        logic.loginUser('paparoni', '123qwe123', (error, userId) => {
                            expect(error).to.be.instanceOf(Error)
                            expect(error.message).to.equal('user not found')
                            expect(userId).to.be.undefined

                            done()
                        })

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
