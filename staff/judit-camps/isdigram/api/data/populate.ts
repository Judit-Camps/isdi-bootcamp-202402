import { MongoClient, ObjectId } from 'mongodb'

let client, users, posts

client = new MongoClient('mongodb://localhost:27017')

client.connect()
    .then(connection => {
        const db = connection.db('isdigram')

        users = db.collection('users')
        posts = db.collection('posts')

        users.deleteMany()
            .then(() => {
                posts.deleteMany()
                    .then(() => {
                        users.insertOne({ name: 'Pepe Roni', birthdate: '2000-01-01', email: 'pepe@roni.com', username: 'peperoni', password: '123qwe123' })
                            .then(result => {
                                let count = 1
                                const insertedPost1 = { author: result.insertedId, image: 'https://images.unsplash.com/photo-1585327969772-17d7940f1a21?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHx8', text: `hello post ${count}`, date: new Date }

                                posts.insertOne(insertedPost1)
                                    .then(() => {
                                        count++
                                        const insertedPost2 = { author: result.insertedId, image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dHJhdmVsJTIwaG9yaXpvbnRhbHxlbnwwfHwwfHx8MA%3D%3D', text: `hello post ${count}`, date: new Date }

                                        posts.insertOne(insertedPost2)
                                            .then(() => {
                                                count++
                                                const insertedPost3 = { author: result.insertedId, image: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YW5pbWFsfGVufDB8fDB8fHww', text: `hello post ${count}`, date: new Date }

                                                posts.insertOne(insertedPost3)
                                                    .then(() => {
                                                        connection.close()
                                                            .then(() => console.log('populated'))
                                                            .catch(console.error)
                                                    })
                                                    .catch(console.error)
                                            })
                                            .catch(console.error)
                                    })
                                    .catch(console.error)
                            })
                            .catch(console.error)
                    })
                    .catch(console.error)
            })
            .catch(console.error)
    })