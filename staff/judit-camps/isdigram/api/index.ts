
import { MongoClient } from 'mongodb'
import express from 'express'
import logic from './logic/index.ts'
import { errors } from 'com'
import tracer from 'tracer'
import colors from 'colors'

const logger = tracer.colorConsole({
    filters: {
        debug: colors.green,
        info: colors.blue,
        warn: colors.yellow,
        error: colors.red
    }
})

const { ContentError, SystemError, DuplicityError, NotFoundError, CredentialsError } = errors

const client = new MongoClient('mongodb://localhost:27017')

client.connect()
    .then(connection => {
        const db = connection.db('isdigram')

        const users = db.collection('users')
        const posts = db.collection('posts')

        logic.users = users
        // @ts-ignore
        logic.posts = posts

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
                        if (error instanceof SystemError) {
                            logger.error(error.message)

                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof DuplicityError) {
                            logger.warn(error.message)

                            res.status(409).json({ error: error.constructor.name, message: error.message })
                        }

                        return
                    }
                    res.status(201).send()
                })
            } catch (error) {
                if (error instanceof TypeError || error instanceof ContentError) {
                    logger.warn(error.message)

                    res.status(406).json({ error: error.constructor.name, message: error.message })
                } else {
                    logger.warn(error.message)

                    res.status(500).json({ error: error.constructor.name, message: error.message })
                }
            }
        })

        // TODO login user -> POST user/auth
        api.post('/users/auth', jsonBodyParser, (req, res) => {
            try {
                const { username, password } = req.body

                logic.loginUser(username, password, (error, userId) => {
                    if (error) {
                        if (error instanceof SystemError) {
                            logger.error(error.message)

                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof CredentialsError) {
                            logger.warn(error.message)

                            res.status(401).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof NotFoundError) {
                            logger.warn(error.message)

                            res.status(404).json({ error: error.constructor.name, message: error.message })
                        }
                        return
                    }
                    res.json(userId)
                })

            } catch (error) {
                if (error instanceof TypeError || error instanceof ContentError) {
                    logger.warn(error.message)

                    res.status(406).json({ error: error.constructor.name, message: error.message })
                } else {
                    logger.warn(error.message)

                    res.status(500).json({ error: error.constructor.name, message: error.message })
                }
            }
        })

        // TODO retrieve user -> GET /user
        api.get('/users/:targetUserId', jsonBodyParser, (req, res) => {
            try {
                const { authorization: userId } = req.headers

                const { targetUserId } = req.params

                logic.retrieveUser(userId, targetUserId, (error, user) => {
                    if (error) {
                        if (error instanceof SystemError) {
                            logger.error(error.message)

                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof NotFoundError) {
                            logger.warn(error.message)

                            res.status(404).json({ error: error.constructor.name, message: error.message })
                        }

                        return
                    }

                    res.json(user)
                })
            } catch (error) {
                if (error instanceof TypeError || error instanceof ContentError) {
                    logger.warn(error.message)

                    res.status(406).json({ error: error.constructor.name, message: error.message })

                } else {
                    logger.warn(error.message)

                    res.status(500).json({ error: error.constructor.name, message: error.message })
                }
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
        api.get('/posts', jsonBodyParser, (req, res) => {
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

        api.post('/posts', jsonBodyParser, (req, res) => {
            try {

            } catch (error) {
                res.status(400).json({ error: error.constructor.name, message: error.message })
            }
        })



        api.listen(8080, () => logger.info('API listening on port 8080'))

    })
    .catch(error => logger.error(error))