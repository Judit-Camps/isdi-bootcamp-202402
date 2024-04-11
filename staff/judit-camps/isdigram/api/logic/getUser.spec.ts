import { MongoClient, ObjectId } from 'mongodb'
import logic from "./index.ts"

import { expect } from 'chai'

describe('retrieveUser / getUser', () => {
    let client, users, posts

    before(done => {
        client = new MongoClient('mongodb://localhost:27017')

        client.connect()
            .then(connection => {
                const db = connection.db('test')

                users = db.collection('users')
                posts = db.collection('posts')

                logic.users = users

                done()
            })
            .catch(done)
    })

    it('retrieves existing user', done => {
        users.deleteMany()
            .then(() => {
                users.insertOne({ name: 'Pepe Roni', birthdate: '2000-01-01', email: 'pepe@roni.com', username: 'peperoni', password: '123qwe123' })
                    .then(() => {
                        let insertedUserId

                        users.findOne({ username: 'peperoni' })
                            .then(user => {
                                insertedUserId = user._id

                                // @ts-ignore
                                logic.getUser(insertedUserId, (error, user) => {
                                    if (error) {
                                        done(error)
                                        return
                                    }

                                    expect(user._id).to.be.undefined
                                    expect(user.username).to.equal('peperoni')
                                    expect(user.email).to.equal('pepe@roni.com')
                                    expect(user.birthdate).to.equal('2000-01-01')
                                    expect(user.password).to.be.undefined
                                    expect(user.status).to.be.undefined

                                    done()

                                })

                            })
                            .catch(done)
                    })
                    .catch(done)
            })
            .catch(done)
    })


    it('does not retrieve a non-existing user', done => {
        users.deleteMany()
            .then(() => {
                users.insertOne({ name: 'Pepe Roni', birthdate: '2000-01-01', email: 'pepe@roni.com', username: 'peperoni', password: '123qwe123' })
                    .then(() => {
                        // @ts-ignore
                        logic.getUser('wrong-id', (error, user) => {
                            expect(error).to.be.instanceOf(Error)
                            expect(error.message).to.equal('user not found')

                            expect(user).to.be.undefined

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
