import { MongoClient, ObjectId } from 'mongodb';
import logic from './index.ts';
import { expect } from 'chai';
import { errors } from 'com';

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
                // @ts-ignore
                logic.posts = posts

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

                                posts.insertOne(insertedPost1)
                                    .then(() => {
                                        insertedPosts.push(insertedPost1)
                                        count++

                                        const insertedPost2 = { author: result.insertedId, image: `http://images.com/${count}`, text: `hello post ${count}`, date: new Date }

                                        posts.insertOne(insertedPost2)
                                            .then(() => {
                                                insertedPosts.push(insertedPost2)
                                                count++

                                                const insertedPost3 = { author: result.insertedId, image: `http://images.com/${count}`, text: `hello post ${count}`, date: new Date }

                                                posts.insertOne(insertedPost3)
                                                    .then(() => {
                                                        insertedPosts.push(insertedPost3)

                                                        debugger
                                                        logic.retrievePostsLatestFirst(result.insertedId.toString(), (error, posts) => {
                                                            if (error) {
                                                                done(error)

                                                                return
                                                            }

                                                            try {
                                                                expect(posts).to.have.lengthOf(3)

                                                                const post1 = posts[2]

                                                                expect(post1.author.username).to.equal('peperoni')
                                                                expect(post1.author.id).to.equal(result.insertedId.toString())
                                                                expect(post1.image).to.equal(insertedPost1.image)
                                                                expect(post1.text).to.equal(insertedPost1.text)
                                                                expect(post1.date).to.be.instanceOf(Date)

                                                                const post2 = posts[1]

                                                                expect(post2.author.username).to.equal('peperoni')
                                                                expect(post2.author.id).to.equal(result.insertedId.toString())
                                                                expect(post2.image).to.equal(insertedPost2.image)
                                                                expect(post2.text).to.equal(insertedPost2.text)
                                                                expect(post2.date).to.be.instanceOf(Date)

                                                                const post3 = posts[0]

                                                                expect(post3.author.username).to.equal('peperoni')
                                                                expect(post3.author.id).to.equal(result.insertedId.toString())
                                                                expect(post3.image).to.equal(insertedPost3.image)
                                                                expect(post3.text).to.equal(insertedPost3.text)
                                                                expect(post3.date).to.be.instanceOf(Date)

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
                            .catch(done)
                    })
                    .catch(done)
            })
            .catch(done)


    })

    // it('fails on post with no author', done => {

    // })

    after(done => {
        client.close()
            .then(() => done())
            .catch(done)
    })
})