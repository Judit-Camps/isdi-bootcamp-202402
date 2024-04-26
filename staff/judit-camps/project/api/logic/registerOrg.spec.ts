import mongoose from "mongoose"

import dotenv from "dotenv"

import { expect } from "chai"
import { errors } from "com"

import logic from "./index.ts"
import { User } from "../data/index.ts"
const { DuplicityError, ContentError } = errors

describe("registerOrg", () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it("should register a new organization", () =>
        User.deleteMany({ role: "organization" })
            .then(() => logic.registerOrg("Casal 1", "casal1", "casal@gmail.com", "123qwe123", "Manresa", "Carrer 1", "bla bla bla"))
            .then(() => User.findOne({ username: "casal1" }))
            .then(org => {
                expect(!!org).to.be.true
                expect(org.name).to.equal("Casal 1")
                expect(org.username).to.equal("casal1")
                expect(org.city).to.equal("Manresa")
                expect(org.address).to.equal("Carrer 1")
                expect(org.description).to.equal("bla bla bla")
                expect(org.status).to.equal("inactive")
                expect(org.role).to.equal("organization")
            })

    )
    // 
    it("should fail to register an organization that already exists", () =>
        User.deleteMany({ role: "organization" })
            .then(() => User.create({ name: "Casal 1", username: "casal1", email: "casal@gmail.com", password: "123qwe123", city: "Manresa", address: "Carrer 1", status: "inactive", role: "organization" }))
            .then(() => logic.registerOrg("Casal 1", "casal1", "casal@gmail.com", "123qwe123", "Manresa", "Carrer 1", "bla bla bla"))
            .catch(error => {
                expect(error).to.be.instanceOf(DuplicityError)
                expect(error.message).to.equal("organization already exists")
            })
    )

    after(() => mongoose.disconnect())

})