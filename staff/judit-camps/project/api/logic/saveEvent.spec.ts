import mongoose from "mongoose"

const { Types: { ObjectId } } = mongoose
import { User, Event } from "../data/index.ts"

import logic from "./index.ts"
import { expect } from "chai"

import { errors } from "com"
const { DuplicityError, NotFoundError } = errors

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


    it("fails to save an already saved event", () =>
        Promise.all([
            User.deleteMany(),
            Event.deleteMany()
        ])
            .then(() => User.create({ name: "Pepe Roni", username: "peperoni", email: "pepe@roni.com", password: "123qwe123", status: "active", role: "regular", savedEvents: [] })
                .then(user => User.create({ name: "Casal 1", username: "casal1", email: "casal@gmail.com", password: "123qwe123", city: "Manresa", address: "Carrer 1", status: "active", role: "organization" })
                    .then(org => Event.create({ title: "Club de lectura: Mirall trencat", author: org._id, city: org.city, address: org.address, date: "2024-05-20", time: "18:30:00", description: "Club de lectura per comentar Mirall trencat de Mercè Rodoreda", price: 0, categories: ["Llibres"], attendees: [] })
                        .then(ev => Promise.all([
                            Event.updateOne({ _id: ev.id }, { $push: { attendees: user.id } }),
                            User.updateOne({ _id: user.id }, { $push: { savedEvents: ev.id } })
                        ])
                            .then(() => logic.saveEvent(user.id, ev.id)
                                .catch(error => {
                                    expect(error).to.be.instanceOf(DuplicityError)
                                    expect(error.message).to.be.equal("user has already saved event")
                                })
                            )
                        )
                    )
                )
            )
    )


    it("fails on unexistent user", () =>
        Promise.all([
            User.deleteMany(),
            Event.deleteMany()
        ])
            .then(() => User.create({ name: "Pepe Roni", username: "peperoni", email: "pepe@roni.com", password: "123qwe123", status: "active", role: "regular", savedEvents: [] })
                .then(user => User.create({ name: "Casal 1", username: "casal1", email: "casal@gmail.com", password: "123qwe123", city: "Manresa", address: "Carrer 1", status: "active", role: "organization" })
                    .then(org => Event.create({ title: "Club de lectura: Mirall trencat", author: org._id, city: org.city, address: org.address, date: "2024-05-20", time: "18:30:00", description: "Club de lectura per comentar Mirall trencat de Mercè Rodoreda", price: 0, categories: ["Llibres"], attendees: [] })
                        .then(ev => Promise.all([
                            Event.updateOne({ _id: ev.id }, { $push: { attendees: user.id } }),
                            User.updateOne({ _id: user.id }, { $push: { savedEvents: ev.id } })
                        ])
                            .then(() => logic.saveEvent(new ObjectId().toString(), ev.id)
                                .catch(error => {
                                    expect(error).to.be.instanceOf(NotFoundError)
                                    expect(error.message).to.be.equal("user not found")
                                })
                            )
                        )
                    )
                )
            )
    )

    it("fails on unexistent event", () =>
        Promise.all([
            User.deleteMany(),
            Event.deleteMany()
        ])
            .then(() => User.create({ name: "Pepe Roni", username: "peperoni", email: "pepe@roni.com", password: "123qwe123", status: "active", role: "regular", savedEvents: [] })
                .then(user => User.create({ name: "Casal 1", username: "casal1", email: "casal@gmail.com", password: "123qwe123", city: "Manresa", address: "Carrer 1", status: "active", role: "organization" })
                    .then(org => Event.create({ title: "Club de lectura: Mirall trencat", author: org._id, city: org.city, address: org.address, date: "2024-05-20", time: "18:30:00", description: "Club de lectura per comentar Mirall trencat de Mercè Rodoreda", price: 0, categories: ["Llibres"], attendees: [] })
                        .then(ev => Promise.all([
                            Event.updateOne({ _id: ev.id }, { $push: { attendees: user.id } }),
                            User.updateOne({ _id: user.id }, { $push: { savedEvents: ev.id } })
                        ])
                            .then(() => logic.saveEvent(user.id, new ObjectId().toString())
                                .catch(error => {
                                    expect(error).to.be.instanceOf(NotFoundError)
                                    expect(error.message).to.be.equal("event not found")
                                })
                            )
                        )
                    )
                )
            )
    )

    after(() => mongoose.disconnect())
})