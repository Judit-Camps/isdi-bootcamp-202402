// import mongoose from "mongoose"
// import dotenv from "dotenv"
// import { errors } from "com"
// import { expect } from "chai"
// import logic from "./index.ts"
// import { Organization, Event } from "../data/index.ts"

// const { UnauthorizedError } = errors

// describe("createEvent", () => {
//     before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

//     it("should create a new event by an organization", () =>
//         Organization.deleteMany()
//             .then(() =>
//                 Event.deleteMany()
//                     .then(() =>
//                         Organization.create({ name: "Casal 1", username: "casal1", email: "casal@gmail.com", password: "123qwe123", location: "Manresa", address: "Carrer 1", status: "validate", role: "organization" })
//                             .then(org =>
//                                 logic.createEvent(org.id, "taller de pintura", "2024-05-10", "16:00", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.")
//                                     .then(() =>
//                                         Event.findOne({})
//                                             .then(act =>
//                                                 expect(act.author.toString()).to.equal(org.id)
//                                                 expect(act.title).to.equal("taller de pintura")
//                                                 expect(act.date).to.equal("2024-05-10")
//                                                 expect(act.time).to.equal("16:00")
//                                                 expect(act.description).to.equal("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.")
//                                             )
//                                     )
//                             )

//                     )
//             )

//     )

//     after(() => mongoose.disconnect())
// })

