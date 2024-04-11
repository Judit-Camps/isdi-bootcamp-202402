import { MongoClient, ObjectId } from 'mongodb'
import logic from "./index.ts"

import { expect } from 'chai'

describe('logic', () => {
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

    describe('registerUser', () => {
        it('registers a new user', done => {
            users.deleteMany()
                .then(() => {
                    logic.registerUser('Pepe Roni', '2000-01-01', 'pepe@roni.com', 'peperoni', '123qwe123', error => {
                        if (error) {
                            done(error)
                            return
                        }

                        users.findOne({ username: 'peperoni' })
                            .then(user => {
                                expect(!!user).to.be.true
                                expect(user.name).to.equal('Pepe Roni')
                                expect(user.birthdate).to.equal('2000-01-01')
                                expect(user.email).to.equal('pepe@roni.com')
                                expect(user.username).to.equal('peperoni')
                                expect(user.password).to.equal('123qwe123')

                                done()

                            })
                            .catch(done)

                    })
                })
                .catch(done)
        })


        it('fails on existing user', done => {
            users.deleteMany()
                .then(() => {
                    users.insertOne({ name: "Pepe Roni", birthdate: "2000-01-01", email: "pepe@roni.com", username: "peperoni", password: "123qwe123" })
                        .then(() => {
                            logic.registerUser('Pepe Roni', '2000-01-01', 'pepe@roni.com', 'peperoni', '123qwe123', error => {
                                expect(error).to.be.instanceof(Error)
                                expect(error.message).to.equal('user already exists')

                                done()
                            })

                        })
                        .catch(done)


                })
                .catch(done)
        })


        it('fails on non string name', () => {
            let errorThrown

            try {
                // @ts-ignore
                logic.registerUser(123, '2000-01-01', 'pepe@roni.com', 'peperoni', '123qwe123', () => { })

            } catch (error) {
                errorThrown = error
            }


            expect(errorThrown).to.be.instanceOf(TypeError)
            expect(errorThrown.message).to.equal('name 123 is not a string')
        })

        it('fails on empty name', () => {
            let errorThrown

            try {
                logic.registerUser('', '2000-01-01', 'pepe@roni.com', 'peperoni', '123qwe123', () => { })

            } catch (error) {
                errorThrown = error
            }

            expect(errorThrown).to.be.instanceOf(Error)
            expect(errorThrown.message).to.equal('name >< is empty or blank')
        })

        it('fails on non string birthdate', () => {
            let errorThrown

            try {
                // @ts-ignore
                logic.registerUser('Pepe Roni', 123, 'pepe@roni.com', 'peperoni', '123qwe123', () => { })

            } catch (error) {
                errorThrown = error
            }

            expect(errorThrown).to.be.instanceOf(TypeError)
            expect(errorThrown.message).to.equal('birthdate 123 is not a valid date')
        })


        it('fails on incorrect birthdate format', () => {
            let errorThrown

            try {
                logic.registerUser('Pepe Roni', '2000/01/01', 'pepe@roni.com', 'peperoni', '123qwe123', () => { })
            } catch (error) {
                errorThrown = error
            }

            expect(errorThrown).to.be.instanceOf(Error)
            expect(errorThrown.message).to.equal('birthdate 2000/01/01 does not have a valid format')
        })


        it('fails on incorrect email format', () => {
            let errorThrown

            try {
                logic.registerUser('Pepe Roni', '2000-01-01', 'pepecom', 'peperoni', '123qwe123', () => { })
            } catch (error) {
                errorThrown = error
            }

            expect(errorThrown).to.be.instanceOf(Error)
            expect(errorThrown.message).to.equal('email is not a correct email')
        })


        it('fails on incorrect password format', () => {
            let errorThrown

            try {
                logic.registerUser('Pepe Roni', '2000-01-01', 'pepe@roni.com', 'peperoni', '123123123', () => { })
            } catch (error) {
                errorThrown = error
            }

            expect(errorThrown).to.be.instanceOf(Error)
            expect(errorThrown.message).to.equal('password is not acceptable')
        })


        it('fails on non-string username', () => {
            let errorThrown

            try {
                // @ts-ignore
                logic.registerUser('Pepe Roni', '2000-01-01', 'pepe@roni.com', 123, '123qwe123', () => { })
            } catch (error) {
                errorThrown = error
            }

            expect(errorThrown).to.be.instanceOf(Error)
            expect(errorThrown.message).to.equal('username 123 is not a string')
        })
    })


    describe('loginUser', () => {
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
    })

    describe('retrieveUser / getUser', () => {
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
    })


    // describe('logoutUser', () => {
    //     it('logs out user', done => {
    //         users.deleteMany()
    //             .then(() => {
    //                 users.insertOne({ name: 'Pepe Roni', birthdate: '2000-01-01', email: 'pepe@roni.com', username: 'peperoni', password: '123qwe123' })
    //                     .then(() => {
    //                         users.findOne({ username: 'peperoni' })
    //                             .then(user => {
    //                                 const insertedUserId = user._id
    //                                 logic.logoutUser(insertedUserId, (error) => {
    //                                     if (error) {
    //                                         done(error)
    //                                         return
    //                                     }

    //                                     users.findOne({ _id: insertedUserId })
    //                                         .then(() => {
    //                                             expect(user.status).to.equal('offline')

    //                                             done()

    //                                         })
    //                                         .catch(done)
    //                                 })
    //                             })
    //                             .catch(done)
    //                     })
    //                     .catch(done)
    //             })
    //             .catch(done)
    //     })

    //     //     it('fails on non-existent user', done => {
    //     //         logic.logoutUser('randomId', (error) => {

    //     //             expect(error).to.be.instanceOf(Error)
    //     //             expect(error.message).to.equal('user to logout not found')

    //     //             done()
    //     //         })
    //     //     })
    // })
    // /*
    //     describe('retrieveUsers', () => {
    //         it('gets all users', done => {
    //             users.deleteOne(user => user.username === "peperoni", (error) => {
    //                 if (error) {
    //                     done(error)
    //                     return
    //                 }
    //                 const document = [{ "username": "juditcamps", "status": "offline", "id": "drzmdewewi8" }, { "username": "pepitogrillo", "status": "online", "id": "p6ealghfjz4" }]
    //                 logic.retrieveUsers((error, users) => {
    //                     if (error) {
    //                         done(error)
    //                         return
    //                     }

    //                     expect(users).to.deep.equal(document)
    //                     done()
    //                 })

    //             })
    //         })
    //     })*/
    after(done => {
        client.close()
            .then(() => done())
            .catch(done)
    })

})
