import { MongoClient } from 'mongodb'
import express from 'express'

import logic from './logic/index.ts'
import { errors } from 'com'

const { ContentError, SystemError, DuplicityError, NotFoundError, CredentialsError } = errors

const client = new MongoClient('mongodb://localhost:27017')

client.connect()
    .then(connection => {
        const db = connection.db('isdigram')

        const users = db.collection('users')

        logic.users = users

        const api = express()

        const jsonBodyParser = express.json()

        api.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.setHeader('Access-Control-Allow-Methods', '*')
            res.setHeader('Access-Control-Allow-Headers', '*')

            next()
        })

        api.post('/users', jsonBodyParser, (req, res) => {
            try {
                const { name, birthdate, email, username, password } = req.body

                logic.registerUser(name, birthdate, email, username, password, error => {
                    if (error) {
                        res.status(400).json({ error: error.constructor.name, message: error.message })

                        return
                    }
                    res.status(201).send()
                })
            } catch (error) {
                res.status(400).json({ error: error.constructor.name, message: error.message })
            }
        })

        // TODO login user -> POST user/auth
        api.post('/users/auth', jsonBodyParser, (req, res) => {
            try {
                const { username, password } = req.body

                logic.loginUser(username, password, (error, userId) => {
                    if (error) {
                        res.status(400).json({ error: error.constructor.name, message: error.message })
                        return
                    }
                    res.json(userId)
                })

            } catch (error) {
                res.status(400).json({ error: error.constructor.name, message: error.message })
            }
        })

        // TODO retrieve user -> GET /user
        api.get('/users/:userId', (req, res) => {
            try {
                const { authorization: userId } = req.params

                const { targetUserId } = req.params

                logic.getUser(userId, targetUserId, (error, user) => {
                    if (error) {
                        res.status(400).json({ error: error.constructor.name, message: error.message })

                        return
                    }

                    res.json(user)
                })
            } catch (error) {
                res.status(400).json({ error: error.constructor.name, message: error.message })
            }
        })


        // LOGOUT
        // api.patch('/users/:userId', jsonBodyParser, (req, res) => {
        //     logic.logoutUser(req.params.userId, (error, user) => {
        //         if (error) {
        //             res.status(500).json({ error: error.constructor.name, message: error.message })
        //             return
        //         }

        //         if (user) {
        //             res.status(201).json(user)
        //         } else {
        //             res.status(404).json(null)
        //         }

        //     })
        // })


        // api.patch('/users/:userId', jsonBodyParser, (req, res) => {
        //     // @ts-ignore
        //     logic.logoutUser(req.params.userId)
        // })

        // TODO retrieve posts -> GET /posts
        api.get('/posts', (req, res) => {
            try {
                const { authorization: userId } = req.headers

                logic.retrievePostsLatestFirst(userId, (error, posts) => {
                    if (error) {
                        res.status(400).json({ error: error.constructor.name, message: error.message })

                        return
                    }

                    res.json(posts)

                })

            } catch (error) {
                res.status(400).json({ error: error.constructor.name, message: error.message })
            }
        })



        api.listen(8080, () => console.log('API listening on port 8080'))

    })
    .catch(error => console.error(error))