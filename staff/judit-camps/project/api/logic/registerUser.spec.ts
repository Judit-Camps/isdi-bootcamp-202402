import mongoose from "mongoose"

import dotenv from "dotenv"

import { expect } from "chai"
import { errors } from "com"

import logic from "./index.ts"
import { User } from "../data/index.ts"
const { DuplicityError, ContentError } = errors

dotenv.config()

describe("registerUser", () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))


    it("should register a new user", () =>
        User.deleteMany()
            .then(() => logic.registerUser("Pepe Roni", "peperoni", "pepe@roni.com", "123qwe123"))
            .then(() => User.findOne({ username: "peperoni" }))
            .then(user => {
                expect(!!user).to.be.true
            })
    )

    it("should fail to register a user that already exists", () =>
        User.deleteMany({ role: "regular" })
            .then(() => User.create({ name: "Pepe Roni", username: "peperoni", email: "pepe@roni.com", password: "123qwe123", status: "active", role: "regular" }))
            .then(() =>
                logic.registerUser("Pepe Roni", "peperoni", "pepe@roni.com", "123qwe123"))
            .catch(error => {
                expect(error).to.be.instanceOf(DuplicityError)
                expect(error.message).to.equal("user already exists")
            })
    )

    it("should fail to register on empty name", () =>
        User.deleteMany({ role: "regular" })
            // @ts-ignore
            .then(() => logic.registerUser("", "peperoni", "pepe@roni.com", "123qwe123"))
            .catch(error => {
                expect(error).to.be.instanceOf(ContentError)
                expect(error.message).to.equal("name: >< is empty or blank")
            })
    )

    it("should fail to register on non-string name", () =>
        User.deleteMany({ role: "regular" })
            // @ts-ignore
            .then(() => logic.registerUser(123, "peperoni", "pepe@roni.com", "123qwe123"))
            .catch(error => {
                expect(error).to.be.instanceOf(TypeError)
                expect(error.message).to.equal("name: 123 is not a string")
            })
    )

    it("should fail to register on non-string username", () =>
        User.deleteMany({ role: "regular" })
            // @ts-ignore
            .then(() => logic.registerUser("Pepito Grillo", 123, "pepe@roni.com", "123qwe123"))
            .catch(error => {
                expect(error).to.be.instanceOf(TypeError)
                expect(error.message).to.equal("username: 123 is not a string")
            })
    )

    it("should fail to register on non-string email", () =>
        User.deleteMany({ role: "regular" })
            // @ts-ignore
            .then(() => logic.registerUser("Pepe Roni", "peperoni", 123, "123qwe123"))
            .catch(error => {
                expect(error).to.be.instanceOf(ContentError)
                expect(error.message).to.equal("email is not valid")
            })
    )

    it("should fail to register on non-string password", () =>
        User.deleteMany({ role: "regular" })
            // @ts-ignore
            .then(() => logic.registerUser("Pepe Roni", "peperoni", "pepe@roni.com", 123))
            .catch(error => {
                expect(error).to.be.instanceOf(ContentError)
                expect(error.message).to.equal("password is not valid")
            })
    )

    after(() => mongoose.disconnect())
})