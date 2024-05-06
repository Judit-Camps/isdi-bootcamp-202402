import mongoose from "mongoose"

import { User, Event } from "../data/index.ts"

import logic from "./index.ts"
import { expect } from "chai"

describe("saveEvent", () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it("should add event id to user savedEvents list; should add userId to event attendees list", () =>
        Promise.all([
            User.deleteMany(),
            Event.deleteMany()
        ])
            .then(() => User.create({ name: "Pepe Roni", username: "peperoni", email: "pepe@roni.com", password: "123qwe123", status: "active", role: "regular", savedEvents: [] })
                .then(user => User.create({ name: "Casal 1", username: "casal1", email: "casal@gmail.com", password: "123qwe123", city: "Manresa", address: "Carrer 1", status: "active", role: "organization" })
                    .then(org => Event.create({ title: "Club de lectura: Mirall trencat", author: org._id, city: org.city, address: org.address, date: "2024-05-20", time: "18:30:00", description: "Club de lectura per comentar Mirall trencat de Mercè Rodoreda", price: 0, categories: ["Llibres"], attendees: [] })
                        .then(ev =>
                            logic.saveEvent(user.id, ev.id)
                                .then(() =>
                                    Promise.all([
                                        User.findById(user.id),
                                        Event.findById(ev.id)
                                    ]))
                                .then(([updatedUser, updatedEvent]) => {
                                    console.log(updatedUser, updatedEvent)
                                    expect(updatedEvent.attendees).to.have.lengthOf(1)
                                    expect(updatedEvent.attendees[0].toString()).to.be.equal(user.id)

                                    expect(updatedUser.savedEvents).to.have.lengthOf(1)
                                    expect(updatedUser.savedEvents[0].toString()).to.be.equal(ev.id)
                                })

                        )


                    )
                )
            )
    )

    after(() => mongoose.disconnect())
})