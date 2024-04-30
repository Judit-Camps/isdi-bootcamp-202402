import mongoose from "mongoose"
import { User, Event } from "."

mongoose.connect("mongodb://localhost:27017/project")
    .then(() => User.deleteMany())
    .then(() => Event.deleteMany())
    .then(() => User.create({ name: 'Pepe Roni', username: 'peperoni', email: 'pepe@roni.com', password: '123qwe123', role: "regular", status: "active" }))
    .then(() => User.create({ name: 'Judit Camps', username: 'juditcamps', email: 'judit@camps.com', password: '123qwe123', role: "regular", status: "active" }))
    .then(() => User.create({ name: "Casal 1", username: "casal1", email: "casal1@gmail.com", password: "123qwe123", city: "Navarcles", address: "Carrer Nou", status: "inactive", role: "organization" }))
    .then(() => User.create({ name: "Casal Cultural", username: "casalcultural", email: "casal@cultural.com", password: "123qwe123", city: "Manresa", address: "Carretera de Vic", status: "active", role: "organization" }))
    .then(org => {
        const event1 = { title: "Taller de pintura infantil", author: org._id, city: org.city, address: org.address, date: "2024-05-23", time: "17:00:00", description: "Taller per a nens de pintura en aquarel·la.", price: 0 }

        const event2 = { title: "Concert escola de música municipal", author: org._id, city: org.city, address: org.address, date: "2024-06-11", time: "18:30:00", description: "Concert dels alumnes de l'escola de música municipal. Seguit amb un berenar per a tots. - Sala polivalent", price: 0 }

        const event3 = { title: "Club de lectura: Mirall trencat", author: org._id, city: org.city, address: org.address, date: "2024-05-20", time: "18:30:00", description: "Club de lectura per comentar Mirall trencat de Mercè Rodoreda", price: 0 }

        return Event.create(event1)
            .then(() => {

                return Event.create(event2)
                    .then(() => {

                        return Event.create(event3)
                    })
            })
    })
    .then(() => mongoose.disconnect())
    .then(() => console.log("populated"))
    .catch(console.error)

