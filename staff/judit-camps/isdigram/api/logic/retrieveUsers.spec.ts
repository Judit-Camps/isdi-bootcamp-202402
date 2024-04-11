import { MongoClient, ObjectId } from 'mongodb'
import logic from "./index.ts"

import { expect } from 'chai'

describe('retrieveUsers', () => {
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
