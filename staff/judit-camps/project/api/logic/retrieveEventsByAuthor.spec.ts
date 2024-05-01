import { errors } from "com"
const { NotFoundError } = errors
import { expect } from "chai"
import mongoose from "mongoose"
const { Types: { ObjectId } } = mongoose

import dotenv from "dotenv"

import { User, Event } from "../data/index.ts"

import logic from "./index.ts"

dotenv.config()

describe("retrieveEventsByAuthor", () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it("Should retrieve all events of a given organization for existing user", () =>
        Promise.all([
            User.deleteMany(),
            Event.deleteMany()
        ])
            .then(() =>
                User.create({ name: "Pepe Roni", username: "peperoni", email: "pepe@roni.com", password: "123qwe123", status: "active", role: "regular" })
                    .then(user =>
                        User.create({ name: "Casal 1", username: "casal1", email: "casal1@gmail.com", password: "123qwe123", city: "Manresa", address: "Carretera de Vic", status: "active", role: "organization" })
                            .then(org1 => User.create({ name: "Casal 2", username: "casal2", email: "casal2@gmail.com", password: "123qwe123", city: "Sallent", address: "Carretera 2", status: "active", role: "organization" })
                                .then(org2 => {
                                    Promise.all([
                                        Event.create({ title: "Taller de pintura infantil", author: org1._id, city: org1.city, address: org1.address, date: "2024-05-23", time: "17:00:00", description: "Taller per a nens de pintura en aquarel·la.", price: 0 }),
                                        Event.create({ title: "Concert escola de música municipal", author: org2._id, city: org2.city, address: org2.address, date: "2024-06-11", time: "18:30:00", description: "Concert dels alumnes de l'escola de música municipal. Seguit amb un berenar per a tots. - Sala polivalent", price: 0 }),
                                        Event.create({ title: "Club de lectura: Mirall trencat", author: org1._id, city: org1.city, address: org1.address, date: "2024-05-20", time: "18:30:00", description: "Club de lectura per comentar Mirall trencat de Mercè Rodoreda", price: 0 })
                                    ])
                                        .then(([event1, event2, event3]) =>
                                            logic.retrieveEventsByAuthor(user.id, org1.id)
                                                .then(events => {
                                                    expect(events).to.have.lengthOf(2)

                                                    const e1 = events[0]
                                                    const e2 = events[1]
                                                    const e3 = events[2]

                                                    expect(e1.author.name).to.equal(org1.name)
                                                    expect(e1.author.id).to.equal(org1.id)
                                                    expect(e1.title).to.equal(event1.title)
                                                    expect(e1.city).to.equal(event1.city)
                                                    expect(e1.address).to.equal(event1.address)
                                                    expect(e1.date).to.deep.equal(event1.date)
                                                    expect(e1.time).to.equal(event1.time)
                                                    expect(e1.description).to.equal(event1.description)
                                                    expect(e1.price).to.equal(event1.price)


                                                    expect(e2.author.name).to.equal(org1.name)
                                                    expect(e2.author.id).to.equal(org1.id)
                                                    expect(e2.title).to.equal(event2.title)
                                                    expect(e2.city).to.equal(event2.city)
                                                    expect(e2.address).to.equal(event2.address)
                                                    expect(e2.date).to.deep.equal(event2.date)
                                                    expect(e2.time).to.equal(event2.time)
                                                    expect(e2.description).to.equal(event2.description)
                                                    expect(e2.price).to.equal(event2.price)

                                                })
                                        )
                                }
                                )

                            )
                    )
            )
    )

    after(() => mongoose.disconnect())
})