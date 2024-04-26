import mongoose from "mongoose"
import { expect } from "chai"
import { errors } from "com"
import logic from "./index.ts"
import { User } from "../data/index.ts"

const { NotFoundError, CredentialsError, UnauthorizedError } = errors

describe("authenticateOrg", () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it("should authenticate an organisation that is registered and accepted", () =>
        User.deleteMany({ role: "organization" })
            .then(() => User.create({ name: "Casal 1", username: "casal1", email: "casal1@gmail.com", password: "123qwe123", location: "Manresa", address: "Carrer 1", description: "bla bla bla", role: "organization", status: "accepted" }))
            .then(() => logic.authenticateOrg("casal1@gmail.com", "123qwe123")
                .then(({ id: orgId }) =>
                    User.findById(orgId)
                        .then(org => {
                            expect(org.status).to.equal("active")
                            expect(org._id.toString()).to.equal(orgId)
                        })
                )

            )
    )

    it("should fail on organization with status inactive", () =>
        User.deleteMany({ role: "organization" })
            .then(() => User.create({ name: "Casal 1", username: "casal1", email: "casal1@gmail.com", password: "123qwe123", location: "Manresa", address: "Carrer 1", description: "bla bla bla", role: "organization", status: "inactive" }))
            .then(() => logic.authenticateOrg("casal1@gmail.com", "123qwe123")
                .catch(error => {
                    expect(error).to.be.instanceOf(UnauthorizedError)
                    expect(error.message).to.equal("organization not authorized for login yet")
                })
            )
    )

    it("should fail on existing organization but incorrect email", () =>
        User.deleteMany({ role: "organization" })
            .then(() => User.create({ name: "Casal 1", username: "casal1", email: "casal1@gmail.com", password: "123qwe123", location: "Manresa", address: "Carrer 1", description: "bla bla bla", role: "organization", status: "inactive" }))
            .then(() => logic.authenticateOrg("casal1@gmail.comaaa", "123qwe123")
                .catch(error => {
                    expect(error).to.be.instanceOf(NotFoundError)
                    expect(error.message).to.equal("organization not found")
                })
            )
    )

    it("should fail on existing organization but incorrect password", () =>
        User.deleteMany({ role: "organization" })
            .then(() => User.create({ name: "Casal 1", username: "casal1", email: "casal1@gmail.com", password: "123qwe123", location: "Manresa", address: "Carrer 1", description: "bla bla bla", role: "organization", status: "inactive" }))
            .then(() => logic.authenticateOrg("casal1@gmail.com", "123qwe123qwe")
                .catch(error => {
                    expect(error).to.be.instanceOf(CredentialsError)
                    expect(error.message).to.equal("wrong credentials")
                })
            )
    )

    it("should fail on un-existing organization", () =>
        User.deleteMany({ role: "organization" })
            .then(() => logic.authenticateOrg("casal1@gmail.comaaa", "123qwe123")
                .catch(error => {
                    expect(error).to.be.instanceOf(NotFoundError)
                    expect(error.message).to.equal("organization not found")
                })
            )
    )

    after(() => mongoose.disconnect())
})