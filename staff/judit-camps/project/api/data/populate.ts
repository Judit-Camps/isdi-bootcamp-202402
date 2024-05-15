import mongoose from "mongoose"
import { User, Event } from "."

mongoose.connect("mongodb://localhost:27017/project")
    .then(() => Promise.all([
        User.deleteMany(),
        Event.deleteMany(),
    ]))
    .then(() => {
        return Promise.all([
            User.create({ name: 'Pepe Roni', username: 'peperoni', email: 'pepe@roni.com', password: '123qwe123', role: "regular", status: "active" }),
            User.create({ name: 'Judit Camps', username: 'juditcamps', email: 'judit@camps.com', password: '123qwe123', role: "regular", status: "active" }),
            User.create({ name: 'Eva Camps', username: 'evacamps', email: 'eva@camps.com', password: '123qwe123', role: "regular", status: "active" }),
            User.create({ name: 'Andrea Contreras', username: 'andreacv', email: 'andreacv@gmail.com', password: '123qwe123', role: "regular", status: "active" }),
            User.create({ name: 'Irene Bahí', username: 'irene_bahi', email: 'irenebahi@gmail.com', password: '123qwe123', role: "regular", status: "active" })
        ])
            .then((users) => {
                return Promise.all([
                    User.create({ name: "Ateneu Popular la Sèquia", username: "ateneulasequia", email: "ateneulasequia@gmail.com", password: "123qwe123", city: "Manresa", address: "Carrer d'Amigant, 10", status: "active", role: "organization" }),
                    User.create({ name: "Casal Nou", username: "casalnou", email: "casalnou@gmail.com", password: "123qwe123", city: "Navarcles", address: "Carrer Nou, 9", status: "active", role: "organization" }),
                    User.create({ name: "Nexe Jove", username: "nexejove", email: "nexejove@gmail.com", password: "123qwe123", city: "Sant Fruitós de Bages", address: "Pl. Alfred Figueras", status: "active", role: "organization" }),
                    User.create({ name: "Casal les Escodines", username: "escodines_casal", email: "escodines@gmail.com", password: "123qwe123", city: "Manresa", address: "C/ de Vic", status: "active", role: "organization" }),
                    User.create({ name: "Ateneu Popular la Feixa", username: "ateneulafeixa", email: "ateneulafeixa@gmail.com", password: "123qwe123", city: "Navàs", address: "Carrer de l'Església, 12", status: "active", role: "organization" })
                ])
                    .then(([org1, org2, org3, org4, org5]) => {
                        return Promise.all([
                            org1, org2, org3, org4, org5,
                            Event.create({ title: "Taller de pintura infantil", author: org3._id, city: org3.city, address: org3.address, date: "2024-05-23", time: "17:00:00", description: "Taller per a nens de pintura en aquarel·la.", price: 0, categories: ["Tallers", "Art", "Infantil"] }),
                            Event.create({ title: "Club de lectura: Mirall trencat", author: org4._id, city: org4.city, address: org4.address, date: "2024-05-20", time: "18:30:00", description: "Club de lectura per comentar Mirall trencat de Mercè Rodoreda", price: 0, categories: ["Llibres"], attendees: [] }),
                            Event.create({ title: "Concert escola de música municipal", author: org2._id, city: org2.city, address: org2.address, date: "2024-06-11", time: "18:30:00", description: "Concert dels alumnes de l'escola de música municipal. Seguit amb un berenar per a tots. - Sala polivalent", price: 0, categories: ["Música", "Concerts", "Infantil"] }),
                            Event.create({ title: "Presentació llibre libel·lulina", author: org1._id, city: org1.city, address: org1.address, date: "2024-05-31", time: "19:00:00", description: "Presentació del llibre il·lustrat, seguit de sopar a la cantina", price: 0, categories: ["Llibres", "Feminisme", "Ecologia"] }),
                            Event.create({ title: "Taller de ganxet", author: org1._id, city: org1.city, address: org1.address, date: "2024-05-20", time: "19:00:00", description: "Taller de ganxet per a principiants, comença el teu projecte amb nosaltres!", price: 0, categories: ["Tallers"] })
                        ])
                    })
            })
    })
    .then(() => mongoose.disconnect())
    .then(() => console.log("populated"))
    .catch(console.error)

