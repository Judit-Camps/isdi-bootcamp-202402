import mongoose from 'mongoose'

import { User, Post } from '.'


mongoose.connect('mongodb://localhost:27017/isdigram')
    .then(() => User.deleteMany())
    .then(() => Post.deleteMany())
    .then(() => User.create({ name: 'Pepe Roni', birthdate: '2000-01-01', email: 'pepe@roni.com', username: 'peperoni', password: '123qwe123' }))
    .then(user1 => {
        let count = 1

        const post1 = { author: user1._id, image: 'https://images.unsplash.com/photo-1585327969772-17d7940f1a21?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHx8', text: `hello post ${count}`, date: new Date }

        return Post.create(post1)
            .then(() => {
                count++
                const post2 = { author: user1._id, image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dHJhdmVsJTIwaG9yaXpvbnRhbHxlbnwwfHwwfHx8MA%3D%3D', text: `hello post ${count}`, date: new Date }

                return Post.create(post2)
            })

            .then(() => {
                count++
                const post3 = { author: user1._id, image: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YW5pbWFsfGVufDB8fDB8fHww', text: `hello post ${count}`, date: new Date }

                return Post.create(post3)
            })
    })

    .then(() => mongoose.disconnect())
    .then(() => console.log('populated'))
    .catch(console.error)