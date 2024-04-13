import { MongoClient, ObjectId } from 'mongodb'
import logic from "./index.ts"
import { expect } from 'chai'
import { errors } from 'com'

const { NotFoundError } = errors

describe('retrieveUser', () => {
    let client, users

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

    it('retrieves existing user', done => {
        users.deleteMany()
            .then(() => {
                users.insertOne({ name: 'Pepe Roni', birthdate: '2000-01-01', email: 'pepe@roni.com', username: 'peperoni', password: '123qwe123' })
                    .then(result => {
                        users.insertOne({ name: 'Pepe Phone', birthdate: '2000-01-01', email: 'pepe@phone.com', username: 'pepephone', password: '123qwe123' })
                            .then(result2 => {
                                // @ts-ignore
                                logic.retrieveUser(result.insertedId.toString(), result2.insertedId.toString(), (error, user) => {
                                    if (error) {
                                        done(error)
                                        return
                                    }

                                    expect(user._id).to.be.undefined
                                    expect(user.username).to.equal('pepephone')
                                    expect(user.email).to.equal('pepe@phone.com')
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


    it('does not retrieve a non-existing target user', done => {
        users.deleteMany()
            .then(() => {
                users.insertOne({ name: 'Pepe Roni', birthdate: '2000-01-01', email: 'pepe@roni.com', username: 'peperoni', password: '123qwe123' })
                    .then(result => {
                        users.insertOne({ name: 'Pepe Phone', birthdate: '2000-01-01', email: 'pepe@phone.com', username: 'pepephone', password: '123qwe123' })
                            .then(() => {
                                logic.retrieveUser(result.insertedId.toString(), new ObjectId().toString(), (error, user) => {
                                    try {
                                        expect(error).to.be.instanceOf(NotFoundError)
                                        expect(error.message).to.equal('target user not found')

                                        expect(user).to.be.undefined

                                        done()

                                    } catch (error) {
                                        done(error)
                                    }
                                })

                            })
                            .catch(done)
                    })
                    .catch(done)
            })
            .catch(done)
    })

    it('does not retrieve a target user from a non-existing user', done => {
        users.deleteMany()
            .then(() => {
                users.insertOne({ name: 'Pepe Roni', birthdate: '2000-01-01', email: 'pepe@roni.com', username: 'peperoni', password: '123qwe123' })
                    .then(result => {
                        users.insertOne({ name: 'Pepe Phone', birthdate: '2000-01-01', email: 'pepe@phone.com', username: 'pepephone', password: '123qwe123' })
                            .then(result2 => {
                                logic.retrieveUser(new ObjectId().toString(), result2.insertedId.toString(), (error, user) => {
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
            .catch(done)
    })


    after(done => {
        client.close()
            .then(() => done())
            .catch(done)
    })

})
