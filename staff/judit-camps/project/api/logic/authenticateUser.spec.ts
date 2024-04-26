import mongoose from "mongoose"
import { expect } from "chai"
import { errors } from "com"
import logic from "./index.ts"
import { User } from "../data/index.ts"

const { NotFoundError, CredentialsError } = errors

describe("authenticateUser", () => {
    before(() => mongoose.connect("mongodb://localhost:27017/test"))

    it("should login an existing user", () =>
        User.deleteMany()
            .then(() => User.create({ name: "Pepe Roni", username: "peperoni", email: "pepe@roni.com", password: "123qwe123", status: "active", role: "regular" }))
            .then(user =>
                logic.authenticateUser("peperoni", "123qwe123")
                    .then(userId => {
                        expect(userId).to.be.a("string")
                        expect(userId).to.equal(user.id)
                    })
            )
    )

    it("fails on existing user but incorrect username", () =>
        User.deleteMany()
            .then(() => User.create({ name: "Pepe Roni", username: "peperoni", email: "pepe@roni.com", password: "123qwe123", status: "active", role: "regular" }))
            .then(() => logic.authenticateUser("peperoni2", "123qwe123"))
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal("user not found")
            })
    )

    it("fails on existing user but incorrect username", () =>
        User.deleteMany()
            .then(() => User.create({ name: "Pepe Roni", username: "peperoni", email: "pepe@roni.com", password: "123qwe123", status: "active", role: "regular" }))
            .then(() => logic.authenticateUser("peperoni", "123qwe123qwe"))
            .catch(error => {
                expect(error).to.be.instanceOf(CredentialsError)
                expect(error.message).to.equal("wrong credentials")
            })
    )

    after(() => mongoose.disconnect())
})