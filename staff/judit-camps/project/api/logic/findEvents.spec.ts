import { errors } from "com"
const { NotFoundError } = errors
import { expect } from "chai"
import mongoose from "mongoose"
const { Types: { ObjectId } } = mongoose

import logic from "./index.ts"

import { User, Event } from "../data/index.ts"


describe("findEvents", () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it("Should retrieve all events for existing user", () =>
        Promise.all([
            User.deleteMany(),
            Event.deleteMany()
        ])
            .then(() =>
                User.create({ name: "Pepe Roni", username: "peperoni", email: "pepe@roni.com", password: "123qwe123", status: "active", role: "regular" })
                    .then(user =>
                        User.create({ name: "Casal Cultural", username: "casalcultural", email: "casal@cultural.com", password: "123qwe123", city: "Manresa", address: "Carretera de Vic", status: "active", role: "organization" })
                            .then(org =>
                                Promise.all([
                                    Event.create({ title: "Taller de pintura infantil", author: org._id, city: org.city, address: org.address, date: "2024-05-23", time: "17:00:00", description: "Taller per a nens de pintura en aquarel·la.", price: 0 }),
                                    Event.create({ title: "Concert escola de música municipal", author: org._id, city: org.city, address: org.address, date: "2024-06-11", time: "18:30:00", description: "Concert dels alumnes de l'escola de música municipal. Seguit amb un berenar per a tots. - Sala polivalent", price: 0 }),
                                    Event.create({ title: "Club de lectura: Mirall trencat", author: org._id, city: org.city, address: org.address, date: "2024-05-20", time: "18:30:00", description: "Club de lectura per comentar Mirall trencat de Mercè Rodoreda", price: 0 })
                                ])
                                    .then(([event1, event2, event3]) =>
                                        logic.findEvents({ userId: user.id })
                                            .then(results => {
                                                expect(results).to.have.lengthOf(3)

                                                const e1 = results[0]
                                                const e2 = results[1]
                                                const e3 = results[2]

                                                expect(e1.author.name).to.equal(org.name)
                                                expect(e1.author.id).to.equal(org.id)
                                                expect(e1.title).to.equal(event1.title)
                                                expect(e1.city).to.equal(event1.city)
                                                expect(e1.address).to.equal(event1.address)
                                                expect(e1.date).to.deep.equal(event1.date)
                                                expect(e1.time).to.equal(event1.time)
                                                expect(e1.description).to.equal(event1.description)
                                                expect(e1.price).to.equal(event1.price)


                                                expect(e2.author.name).to.equal(org.name)
                                                expect(e2.author.id).to.equal(org.id)
                                                expect(e2.title).to.equal(event2.title)
                                                expect(e2.city).to.equal(event2.city)
                                                expect(e2.address).to.equal(event2.address)
                                                expect(e2.date).to.deep.equal(event2.date)
                                                expect(e2.time).to.equal(event2.time)
                                                expect(e2.description).to.equal(event2.description)
                                                expect(e2.price).to.equal(event2.price)


                                                expect(e3.author.name).to.equal(org.name)
                                                expect(e3.author.id).to.equal(org.id)
                                                expect(e3.title).to.equal(event3.title)
                                                expect(e3.city).to.equal(event3.city)
                                                expect(e3.address).to.equal(event3.address)
                                                expect(e3.date).to.deep.equal(event3.date)
                                                expect(e3.time).to.equal(event3.time)
                                                expect(e3.description).to.equal(event3.description)
                                                expect(e3.price).to.equal(event3.price)
                                            })
                                    )

                            )
                    )
            )
    )


    it("Should retrieve all events that pass the filters", () =>
        Promise.all([
            User.deleteMany(),
            Event.deleteMany()
        ])
            .then(() =>
                User.create({ name: "Pepe Roni", username: "peperoni", email: "pepe@roni.com", password: "123qwe123", status: "active", role: "regular" })
                    .then(user =>
                        User.create({ name: "Casal Cultural", username: "casalcultural", email: "casal@cultural.com", password: "123qwe123", city: "Manresa", address: "Carretera de Vic", status: "active", role: "organization" })
                            .then(org => Event.create({ title: "Taller de pintura infantil", author: org._id, city: org.city, address: org.address, date: "2024-05-23", time: "17:00:00", description: "Taller per a nens de pintura en aquarel·la.", price: 2 })
                                .then(event1 => Event.create({ title: "Concert escola de música municipal", author: org._id, city: org.city, address: org.address, date: "2024-06-11", time: "18:30:00", description: "Concert dels alumnes de l'escola de música municipal. Seguit amb un berenar per a tots. - Sala polivalent", price: 0 })
                                    .then(event2 => Event.create({ title: "Club de lectura: Mirall trencat", author: org._id, city: org.city, address: org.address, date: "2024-05-23", time: "18:30:00", description: "Club de lectura per comentar Mirall trencat de Mercè Rodoreda", price: 0 })

                                        .then(event3 =>
                                            logic.findEvents({ userId: user.id, date: "2024-05-23" })
                                                .then(results => {
                                                    expect(results).to.have.lengthOf(2)

                                                    const e1 = results[0]
                                                    const e2 = results[1]

                                                    expect(e1.author.name).to.equal(org.name)
                                                    expect(e1.author.id).to.equal(org.id)
                                                    expect(e1.title).to.equal(event1.title)
                                                    expect(e1.city).to.equal(event1.city)
                                                    expect(e1.address).to.equal(event1.address)
                                                    expect(e1.date).to.deep.equal(event1.date)
                                                    expect(e1.time).to.equal(event1.time)
                                                    expect(e1.description).to.equal(event1.description)
                                                    expect(e1.price).to.equal(event1.price)


                                                    expect(e2.author.name).to.equal(org.name)
                                                    expect(e2.author.id).to.equal(org.id)
                                                    expect(e2.title).to.equal(event3.title)
                                                    expect(e2.city).to.equal(event3.city)
                                                    expect(e2.address).to.equal(event3.address)
                                                    expect(e2.date).to.deep.equal(event3.date)
                                                    expect(e2.time).to.equal(event3.time)
                                                    expect(e2.description).to.equal(event3.description)
                                                    expect(e2.price).to.equal(event3.price)
                                                })
                                        )

                                    )

                                )
                            )
                    )
            )
    )

    it("Should retrieve all events that pass the filters. Pt.2", () =>
        Promise.all([
            User.deleteMany(),
            Event.deleteMany()
        ])
            .then(() =>
                User.create({ name: "Pepe Roni", username: "peperoni", email: "pepe@roni.com", password: "123qwe123", status: "active", role: "regular" })
                    .then(user =>
                        User.create({ name: "Casal Cultural", username: "casalcultural", email: "casal@cultural.com", password: "123qwe123", city: "Manresa", address: "Carretera de Vic", status: "active", role: "organization" })
                            .then(org => Event.create({ title: "Taller de pintura infantil", author: org._id, city: org.city, address: org.address, date: "2024-05-23", time: "17:00:00", description: "Taller per a nens de pintura en aquarel·la.", price: 2, categories: ["Tallers", "Infantil", "Art"] })
                                .then(event1 => Event.create({ title: "Concert escola de música municipal", author: org._id, city: org.city, address: org.address, date: "2024-06-11", time: "18:30:00", description: "Concert dels alumnes de l'escola de música municipal. Seguit amb un berenar per a tots. - Sala polivalent", price: 0, categories: ["Concerts", "Infantil"] })
                                    .then(event2 => Event.create({ title: "Club de lectura: Mirall trencat", author: org._id, city: org.city, address: org.address, date: "2024-05-23", time: "18:30:00", description: "Club de lectura per comentar Mirall trencat de Mercè Rodoreda", price: 0, categories: ["Llibres"] })
                                        .then(event3 =>
                                            logic.findEvents({ userId: user.id, organizationId: org.id, categories: ["Infantil"] })
                                                .then(results => {
                                                    expect(results).to.have.lengthOf(2)

                                                    const e1 = results[0]
                                                    const e2 = results[1]

                                                    expect(e1.author.name).to.equal(org.name)
                                                    expect(e1.author.id).to.equal(org.id)
                                                    expect(e1.title).to.equal(event1.title)
                                                    expect(e1.city).to.equal(event1.city)
                                                    expect(e1.address).to.equal(event1.address)
                                                    expect(e1.date).to.deep.equal(event1.date)
                                                    expect(e1.time).to.equal(event1.time)
                                                    expect(e1.description).to.equal(event1.description)
                                                    expect(e1.price).to.equal(event1.price)


                                                    expect(e2.author.name).to.equal(org.name)
                                                    expect(e2.author.id).to.equal(org.id)
                                                    expect(e2.title).to.equal(event2.title)
                                                    expect(e2.city).to.equal(event2.city)
                                                    expect(e2.address).to.equal(event2.address)
                                                    expect(e2.date).to.deep.equal(event2.date)
                                                    expect(e2.time).to.equal(event2.time)
                                                    expect(e2.description).to.equal(event2.description)
                                                    expect(e2.price).to.equal(event2.price)
                                                })
                                        )

                                    )

                                )
                            )
                    )
            )
    )

    after(() => mongoose.disconnect())
})