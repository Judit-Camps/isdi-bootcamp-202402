import { errors } from "com"
const { NotFoundError } = errors
import { expect } from "chai"
import mongoose from "mongoose"
const { Types: { ObjectId } } = mongoose

import dotenv from "dotenv"

import { User, Event } from "../data/index.ts"

import logic from "./index.ts"

dotenv.config()

describe("retrieveSavedEvents", () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it("Should retrieve all saved events for existing user", () =>
        Promise.all([
            User.deleteMany(),
            Event.deleteMany()
        ])
            .then(() =>
                User.create({ name: "Pepe Roni", username: "peperoni", email: "pepe@roni.com", password: "123qwe123", status: "active", role: "regular", savedEvents: [] })
                    .then(user =>
                        User.create({ name: "Casal Cultural", username: "casalcultural", email: "casal@cultural.com", password: "123qwe123", city: "Manresa", address: "Carretera de Vic", status: "active", role: "organization" })
                            .then(org =>
                                Event.create({ title: "Taller de pintura infantil", author: org._id, city: org.city, address: org.address, date: "2024-05-23", time: "17:00:00", description: "Taller per a nens de pintura en aquarel·la.", price: 0, attendees: [] })
                                    .then(event1 =>
                                        Event.create({ title: "Concert escola de música municipal", author: org._id, city: org.city, address: org.address, date: "2024-06-11", time: "18:30:00", description: "Concert dels alumnes de l'escola de música municipal. Seguit amb un berenar per a tots. - Sala polivalent", price: 0, attendees: [] })
                                            .then(event2 =>
                                                Event.create({ title: "Club de lectura: Mirall trencat", author: org._id, city: org.city, address: org.address, date: "2024-05-20", time: "18:30:00", description: "Club de lectura per comentar Mirall trencat de Mercè Rodoreda", price: 0, attendees: [] })
                                                    .then(event3 =>
                                                        Promise.all([
                                                            User.updateOne({ _id: user.id }, { $push: { savedEvents: { $each: [event1.id, event3.id] } } }),
                                                            Event.updateOne({ _id: event1.id }, { $push: { attendees: user.id } }),
                                                            Event.updateOne({ _id: event3.id }, { $push: { attendees: user.id } })
                                                        ])
                                                            .then(() =>
                                                                logic.retrieveSavedEvents(user.id)
                                                                    .then(events => {
                                                                        expect(events).to.have.lengthOf(2)

                                                                        const e1 = events[0]
                                                                        const e3 = events[1]

                                                                        expect(e1.author.name).to.equal(org.name)
                                                                        expect(e1.author.id).to.equal(org.id)
                                                                        expect(e1.title).to.equal(event1.title)
                                                                        expect(e1.city).to.equal(event1.city)
                                                                        expect(e1.address).to.equal(event1.address)
                                                                        expect(e1.date).to.deep.equal(event1.date)
                                                                        expect(e1.time).to.equal(event1.time)
                                                                        expect(e1.description).to.equal(event1.description)
                                                                        expect(e1.price).to.equal(event1.price)

                                                                        expect(e1.attendees).to.equal(user.name)


                                                                        expect(e3.author.name).to.equal(org.name)
                                                                        expect(e3.author.id).to.equal(org.id)
                                                                        expect(e3.title).to.equal(event3.title)
                                                                        expect(e3.city).to.equal(event3.city)
                                                                        expect(e3.address).to.equal(event3.address)
                                                                        expect(e3.date).to.deep.equal(event3.date)
                                                                        expect(e3.time).to.equal(event3.time)
                                                                        expect(e3.description).to.equal(event3.description)
                                                                        expect(e3.price).to.equal(event3.price)
                                                                        expect(e3.attendees[0]).to.equal(user.id)

                                                                    })
                                                            )
                                                    )
                                            )
                                    )
                            )
                    )
            )
    )

    after(() => mongoose.disconnect())
})