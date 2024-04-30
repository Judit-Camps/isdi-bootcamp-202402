import { errors } from "com"
const { NotFoundError } = errors
import { expect } from "chai"
import mongoose from "mongoose"
const { Types: { ObjectId } } = mongoose

import dotenv from "dotenv"

import { User } from "../data/index.ts"

import logic from "./index.ts"

dotenv.config()

describe("retrieveUser", () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it("should retrive an existing user", () =>
        User.deleteMany()
            .then(() => User.create({ name: "Pepe Roni", username: "peperoni", email: "pepe@roni.com", password: "123qwe123", status: "active", role: "regular" }))
            .then(user1 =>
                User.create({ name: "Pepito Grillo", username: "pepitogrillo", email: "pepito@grillo.com", password: "123qwe123", status: "active", role: "regular" })
                    .then(user2 => logic.retrieveUser(user1.id, user2.id))
                    .then(user => {
                        expect(user.name).to.equal("Pepito Grillo")
                        expect(user.username).to.equal("pepitogrillo")
                        expect(user.email).to.equal("pepito@grillo.com")
                    })
            )
    )

    it("fails to retrive target by a non-existing user", () =>
        User.deleteMany()
            .then(() => User.create({ name: "Pepe Roni", username: "peperoni", email: "pepe@roni.com", password: "123qwe123", status: "active", role: "regular" }))
            .then(user2 => logic.retrieveUser(new ObjectId().toString(), user2.id))
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal("user not found")
            })
    )

    it("fails to retrive a non-existing target user", () =>
        User.deleteMany()
            .then(() => User.create({ name: "Pepe Roni", username: "peperoni", email: "pepe@roni.com", password: "123qwe123", status: "active", role: "regular" }))
            .then(user1 => logic.retrieveUser(user1.id, new ObjectId().toString()))
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal("target user not found")
            })
    )


    after(() => mongoose.disconnect())
})