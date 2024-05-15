import mongoose from "mongoose"
import { expect } from "chai"
import { User, Event } from "../data/index.ts"
import logic from "./index.ts"

describe("removeEvent", () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it("should remove userId from event attendees; should remove eventId from users savedEvents", () =>
        Promise.all([
            User.deleteMany(),
            Event.deleteMany()
        ])
            .then(() => User.create({ name: "Pepe Roni", username: "peperoni", email: "pepe@roni.com", password: "123qwe123", status: "active", role: "regular", savedEvents: [] })
                .then(user => User.create({ name: "Casal 1", username: "casal1", email: "casal@gmail.com", password: "123qwe123", city: "Manresa", address: "Carrer 1", status: "active", role: "organization" })
                    .then(org => Event.create({ title: "Club de lectura: Mirall trencat", author: org._id, city: org.city, address: org.address, date: "2024-05-20", time: "18:30:00", description: "Club de lectura per comentar Mirall trencat de Mercè Rodoreda", price: 0, categories: ["Llibres"], attendees: [] })
                        .then(ev =>
                            Promise.all([
                                Event.updateOne({ _id: ev.id }, { $push: { attendees: user.id } }),
                                User.updateOne({ _id: user.id }, { $push: { savedEvents: ev.id } })
                            ])
                                .then(() =>
                                    logic.removeEvent(user.id, ev.id)
                                        .then(() =>
                                            Promise.all([
                                                User.findById(user.id),
                                                Event.findById(ev.id)
                                            ]))
                                        .then(([updatedUser, updatedEvent]) => {
                                            expect(updatedEvent.attendees).to.have.lengthOf(0)

                                            expect(updatedUser.savedEvents).to.have.lengthOf(0)
                                        })
                                )
                        )
                    )
                )
            )
    )

    after(() => mongoose.disconnect())
})