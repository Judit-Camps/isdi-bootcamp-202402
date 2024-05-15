import mongoose from "mongoose"

import { User } from "../data/index.ts"

import { expect } from "chai"
import logic from "./index.ts"

describe("retrieveOrgList", () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it("should return an array of all organizations", () =>
        User.deleteMany()
            .then(() =>
                Promise.all([
                    User.create({ name: "Casal 1", username: "casal1", email: "casal@gmail.com", password: "123qwe123", location: "Manresa", address: "Carrer 1", status: "active", role: "organization" }),
                    User.create({ name: "Casal 2", username: "casal2", email: "casal2@gmail.com", password: "123qwe123", location: "Manresa", address: "Carrer 2", status: "active", role: "organization" }),
                    User.create({ name: "Casal 3", username: "casal3", email: "casal3@gmail.com", password: "123qwe123", location: "Manresa", address: "Carrer 3", status: "active", role: "organization" }),

                ])
            )
            .then(([org1, org2, org3]) => Promise.all([
                org1, org2, org3,
                logic.retrieveOrgList().then(orgs => {
                    expect(orgs[0].id).to.equal(org1.id)
                    expect(orgs[0].name).to.equal(org1.name)

                    expect(orgs[1].id).to.equal(org2.id)
                    expect(orgs[1].name).to.equal(org2.name)

                    expect(orgs[2].id).to.equal(org3.id)
                    expect(orgs[2].name).to.equal(org3.name)
                })
            ])
            )

    )

    after(() => mongoose.disconnect())
})