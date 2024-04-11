import { MongoClient, ObjectId } from 'mongodb'
import logic from "./index.ts"

import { expect } from 'chai'

describe('logoutUser', () => {
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
    after(done => {
        client.close()
            .then(() => done())
            .catch(done)
    })

})
