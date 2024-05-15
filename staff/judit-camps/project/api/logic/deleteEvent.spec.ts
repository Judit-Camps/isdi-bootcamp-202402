import mongoose from "mongoose"
import { expect } from "chai"
import { errors } from "com"
import { User, Event } from "../data/index.ts"
import logic from "./index.ts"
const { Types: { ObjectId } } = mongoose

const { NotFoundError, UnauthorizedError } = errors

describe("deleteEvent", () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it("should delete a given post", () =>
        Promise.all([
            User.deleteMany(),
            Event.deleteMany()
        ])
            .then(() => User.create({ name: "Casal 1", username: "casal1", email: "casal@gmail.com", password: "123qwe123", city: "Manresa", address: "Carrer 1", status: "active", role: "organization" })
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


    it("fails to delete unexistent post", () => {

        Promise.all([
            User.deleteMany(),
            Event.deleteMany()
        ])
            .then(() => User.create({ name: "Casal 1", username: "casal1", email: "casal@gmail.com", password: "123qwe123", city: "Manresa", address: "Carrer 1", status: "active", role: "organization" })
                .then(org => Event.create({ title: "Taller de pintura infantil", author: org._id, city: org.city, address: org.address, date: "2024-05-23", time: "17:00:00", description: "Taller per a nens de pintura en aquarel·la.", price: 2, categories: ["Tallers", "Infantil", "Art"] })
                    .then(ev => {
                        let errorThrown

                        try {
                            logic.deleteEvent(org._id.toString(), new ObjectId().toString())
                        } catch (error) {
                            errorThrown = error
                        }

                        expect(errorThrown).to.be.instanceOf(NotFoundError)
                        expect(errorThrown.message).to.equal("event not found")

                    })
                )
            )
    })

    it("fails to delete existent post by unexistent organization", () => {

        Promise.all([
            User.deleteMany(),
            Event.deleteMany()
        ])
            .then(() => User.create({ name: "Casal 1", username: "casal1", email: "casal@gmail.com", password: "123qwe123", city: "Manresa", address: "Carrer 1", status: "active", role: "organization" })
                .then(org => Event.create({ title: "Taller de pintura infantil", author: org._id, city: org.city, address: org.address, date: "2024-05-23", time: "17:00:00", description: "Taller per a nens de pintura en aquarel·la.", price: 2, categories: ["Tallers", "Infantil", "Art"] })
                    .then(ev => {
                        let errorThrown

                        try {
                            logic.deleteEvent(new ObjectId().toString(), ev._id.toString())

                        } catch (error) {
                            errorThrown = error
                        }

                        expect(errorThrown).to.be.instanceOf(NotFoundError)
                        expect(errorThrown.message).to.equal("organization not found")
                    })
                )
            )
    })


    it("fails to delete existent post by unauthorized organization", () => {

        Promise.all([
            User.deleteMany(),
            Event.deleteMany()
        ])
            .then(() => User.create({ name: "Casal 1", username: "casal1", email: "casal@gmail.com", password: "123qwe123", city: "Manresa", address: "Carrer 1", status: "active", role: "organization" })
                .then(org => Event.create({ title: "Taller de pintura infantil", author: org._id, city: org.city, address: org.address, date: "2024-05-23", time: "17:00:00", description: "Taller per a nens de pintura en aquarel·la.", price: 2, categories: ["Tallers", "Infantil", "Art"] })
                    .then(ev => User.create({ name: "Pepe Roni", username: "peperoni", email: "pepe@roni.com", password: "123qwe123", status: "active", role: "regular" })
                        .then(user => {
                            let errorThrown

                            try {
                                logic.deleteEvent(user._id.toString(), ev._id.toString())

                            } catch (error) {
                                errorThrown = error
                            }

                            expect(errorThrown).to.be.instanceOf(UnauthorizedError)
                            expect(errorThrown.message).to.equal("organization unauthorized for deletion")
                        })
                    )
                )
            )
    })


    after(() => mongoose.disconnect())
})