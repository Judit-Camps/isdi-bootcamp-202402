// @ts-nocheck
import mongoose from 'mongoose'
import logic from './index.ts'
import { expect, use } from 'chai'
import { errors } from 'com'
import chaiAsPromised from 'chai-as-promised'

import { User, Post } from '../data/index.ts'

use(chaiAsPromised)

const { Types: { ObjectId } } = mongoose

const { CredentialsError, NotFoundError } = errors

describe('createPost', () => {
    before(() => mongoose.connect('mongodb://localhost:27017/test'))

    it('creates post with image and text from existing user', () =>
        User.deleteMany()
            .then(() =>
                Post.deleteMany()
                    .then(() =>
                        User.create({ name: "Pepe Roni", birthdate: "2000-01-01", email: "pepe@roni.com", username: "peperoni", password: "123qwe123" })
                            .then(user => {
                                logic.createPost(user.id, 'http://images.com/lala', 'this is a new post')
                                    .then(() =>
                                        Post.findOne({})
                                            .then(post => {
                                                expect(post.author.toString()).to.equal(post.id)
                                                expect(post.image).to.equal('http://images.com/lala')
                                                expect(post.text).to.equal('this is a new post')
                                                expect(post.date).to.be.instanceOf(Date)

                                            })
                                    )
                            })
                    )
            )
    )

    it('fails to create a post with image and text from un-existing user', () =>
        User.deleteMany()
            .then(() =>
                Post.deleteMany()
                    .then(() =>
                        User.create({ name: "Pepe Roni", birthdate: "2000-01-01", email: "pepe@roni.com", username: "peperoni", password: "123qwe123" })
                            .then(user => {

                                expect(
                                    logic.createPost(new ObjectId().toString(), 'http://images.com/lala', 'this is a new post')).to.be.rejectedWith(NotFoundError, 'user not found')
                            })
                    )
            )
    )


    after(() => mongoose.disconnect())
})