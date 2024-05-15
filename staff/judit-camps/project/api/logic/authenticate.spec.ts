import mongoose from "mongoose"
import { expect } from "chai"
import { errors } from "com"
import logic from "./index.ts"
import { User } from "../data/index.ts"

const { NotFoundError, CredentialsError, UnauthorizedError, ContentError } = errors

describe("authenticate", () => {
    before(() => mongoose.connect("mongodb://localhost:27017/test"))

    it("should login an existing user", () =>
        User.deleteMany()
            .then(() => User.create({ name: "Pepe Roni", username: "peperoni", email: "pepe@roni.com", password: "123qwe123", status: "active", role: "regular" }))
            .then(user =>
                logic.authenticate("peperoni", "123qwe123")
                    .then(result => {
                        expect(result.userId).to.be.a("string")
                        expect(result.userId).to.equal(user.id)
                        expect(result.role).to.equal("regular")
                        expect(result.status).to.equal("active")
                    })
            )
    )

    it("fails on existing user but incorrect username", () =>
        User.deleteMany()
            .then(() => User.create({ name: "Pepe Roni", username: "peperoni", email: "pepe@roni.com", password: "123qwe123", status: "active", role: "regular" }))
            .then(() => logic.authenticate("peperoni2", "123qwe123"))
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal("user or organization not found")
            })
    )

    it("fails on existing user but incorrect password", () =>
        User.deleteMany()
            .then(() => User.create({ name: "Pepe Roni", username: "peperoni", email: "pepe@roni.com", password: "123qwe123", status: "active", role: "regular" }))
            .then(() => logic.authenticate("peperoni", "123qwe123qwe"))
            .catch(error => {
                expect(error).to.be.instanceOf(CredentialsError)
                expect(error.message).to.equal("wrong credentials")
            })
    )

    it("fails on non-string username", () =>
        User.deleteMany()
            .then(() => User.create({ name: "Pepe Roni", username: "peperoni", email: "pepe@roni.com", password: "123qwe123", status: "active", role: "regular" }))

            .then(() => {
                let errorThrown
                try {
                    // @ts-ignore
                    logic.authenticate(123, "123qwe123")
                } catch (error) {
                    errorThrown = error
                }

                expect(errorThrown).to.be.instanceOf(TypeError)
                expect(errorThrown.message).to.equal("username: 123 is not a string")
            })
    )

    it("fails on non-string password", () =>
        User.deleteMany()
            .then(() => User.create({ name: "Pepe Roni", username: "peperoni", email: "pepe@roni.com", password: "123qwe123", status: "active", role: "regular" }))

            .then(() => {
                let errorThrown
                try {
                    // @ts-ignore
                    logic.authenticate("peperoni", 123)
                } catch (error) {
                    errorThrown = error
                }

                expect(errorThrown).to.be.instanceOf(ContentError)
                expect(errorThrown.message).to.equal("password is not valid")
            })
    )


    it("should authenticate an organisation that is registered and accepted", () =>
        User.deleteMany({ role: "organization" })
            .then(() => User.create({ name: "Casal 1", username: "casal1", email: "casal1@gmail.com", password: "123qwe123", location: "Manresa", address: "Carrer 1", description: "bla bla bla", role: "organization", status: "accepted" }))
            .then(() => logic.authenticate("casal1", "123qwe123")
                .then(res =>
                    User.findById(res.userId)
                        .then(org => {
                            expect(org.status).to.equal("active")
                            expect(org._id.toString()).to.equal(res.userId)
                        })
                )

            )
    )

    it("should authenticate an organisation that is registered and active", () =>
        User.deleteMany({ role: "organization" })
            .then(() => User.create({ name: "Casal 1", username: "casal1", email: "casal1@gmail.com", password: "123qwe123", location: "Manresa", address: "Carrer 1", description: "bla bla bla", role: "organization", status: "active" }))
            .then(() => logic.authenticate("casal1", "123qwe123")
                .then(res =>
                    User.findById(res.userId)
                        .then(org => {
                            expect(org.status).to.equal("active")
                            expect(org._id.toString()).to.equal(res.userId)
                        })
                )

            )
    )

    it("fails on organization with status inactive", () =>
        User.deleteMany({ role: "organization" })
            .then(() => User.create({ name: "Casal 1", username: "casal1", email: "casal1@gmail.com", password: "123qwe123", location: "Manresa", address: "Carrer 1", description: "bla bla bla", role: "organization", status: "inactive" }))
            .then(() => logic.authenticate("casal1", "123qwe123")
                .catch(error => {
                    expect(error).to.be.instanceOf(UnauthorizedError)
                    expect(error.message).to.equal("organization not authorized for login yet")
                })
            )
    )

    it("fails on existing organization but incorrect username", () =>
        User.deleteMany({ role: "organization" })
            .then(() => User.create({ name: "Casal 1", username: "casal1", email: "casal1@gmail.com", password: "123qwe123", location: "Manresa", address: "Carrer 1", description: "bla bla bla", role: "organization", status: "active" }))
            .then(() => logic.authenticate("casal123", "123qwe123")
                .catch(error => {
                    expect(error).to.be.instanceOf(NotFoundError)
                    expect(error.message).to.equal("user or organization not found")
                })
            )
    )

    it("fails on existing organization but incorrect password", () =>
        User.deleteMany({ role: "organization" })
            .then(() => User.create({ name: "Casal 1", username: "casal1", email: "casal1@gmail.com", password: "123qwe123", location: "Manresa", address: "Carrer 1", description: "bla bla bla", role: "organization", status: "active" }))
            .then(() => logic.authenticate("casal1", "123qwe123qwe")
                .catch(error => {
                    expect(error).to.be.instanceOf(CredentialsError)
                    expect(error.message).to.equal("wrong credentials")
                })
            )
    )

    it("fails on un-existing organization", () =>
        User.deleteMany({ role: "organization" })
            .then(() => logic.authenticate("casal123", "123qwe123")
                .catch(error => {
                    expect(error).to.be.instanceOf(NotFoundError)
                    expect(error.message).to.equal("user or organization not found")
                })
            )
    )


    after(() => mongoose.disconnect())
})