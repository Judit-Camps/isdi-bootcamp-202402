import mongoose from "mongoose"
import { expect } from "chai"

import { User, Event } from "../data/index.ts"
import logic from "./index.ts"

describe("deleteEvent", () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it("should delete a given post", () =>
        Promise.all([
            User.deleteMany(),
            Event.deleteMany()
        ])
            .then(() => User.create({ name: "Casal 1", username: "casal1", email: "casal@gmail.com", password: "123qwe123", city: "Manresa", address: "Carrer 1", status: "inactive", role: "organization" })
                .then(org => Event.create({ title: "Taller de pintura infantil", author: org._id, city: org.city, address: org.address, date: "2024-05-23", time: "17:00:00", description: "Taller per a nens de pintura en aquarel·la.", price: 2, categories: ["Tallers", "Infantil", "Art"] })
                    .then(ev => {

                        logic.deleteEvent(org._id.toString(), ev._id.toString())
                            .then(() => Event.findOne({}))
                            .then(events => {
                                expect(events).to.be.null
                            })
                    })
                )
            )
    )

    after(() => mongoose.disconnect())
})