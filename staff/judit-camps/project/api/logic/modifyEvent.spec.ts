import mongoose from "mongoose"
import { expect } from "chai"
import { User, Event } from "../data/index.ts"
import logic from "./index.ts"

describe("modifyEvent", () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it("should modify an event", () =>
        Promise.all([
            User.deleteMany(),
            Event.deleteMany()
        ])
            .then(() => User.create({ name: "Casal 1", username: "casal1", email: "casal1@gmail.com", password: "123qwe123", city: "Manresa", address: "Carrer 1", description: "bla bla bla", role: "organization", status: "active" })
                .then(org => Event.create({ title: "Club de lectura: Mirall trencat", author: org._id, city: org.city, address: org.address, date: "2024-05-20", time: "18:30:00", description: "Club de lectura per comentar Mirall trencat de Mercè Rodoreda", price: 0, categories: ["Llibres"], attendees: [] })
                    .then(ev => {
                        return logic.modifyEvent(org.id, ev.id, "new title",
                            "new city",
                            "new address",
                            "new description",
                            ["new category 1", "new category 2"],
                            "2024-10-10",
                            "10:00",
                            3)
                    })
                    .then(() => Event.findOne()
                        .then(res => {
                            expect(res.title).to.be.equal("new title")
                            expect(res.description).to.be.equal("new description")
                        })
                    )
                )
            )
    )

    after(() => mongoose.disconnect())
})