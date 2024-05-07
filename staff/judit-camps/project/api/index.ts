// @ts-nocheck
import mongoose from "mongoose"
import dotenv from "dotenv"
import express from "express"

import logic from "./logic/index.ts"
import { errors } from "com"

import tracer from "tracer"
import colors from "colors"
import cors from "cors"
import jwt from "jsonwebtoken"
import { error } from "console"

dotenv.config()

const { TokenExpiredError } = jwt

const { MONGODB_URL, PORT, JWT_SECRET, JWT_EXP } = process.env

const logger = tracer.colorConsole({
    filters: {
        debug: colors.green,
        info: colors.blue,
        warn: colors.yellow,
        error: colors.red
    }
})

const { DuplicityError, ContentError, CredentialsError, NotFoundError, SystemError, UnauthorizedError } = errors

mongoose.connect(MONGODB_URL)
    .then(() => {
        const api = express()

        const jsonBodyParser = express.json()

        api.use(cors())

        api.post("/users", jsonBodyParser, (req, res) => {
            try {
                const { name, username, email, password } = req.body

                logic.registerUser(name, username, email, password)
                    .then(() => res.status(201).send())
                    .catch(error => {
                        if (error instanceof SystemError) {
                            logger.error(error.message)

                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof DuplicityError) {
                            logger.warn(error.message)

                            res.status(409).json({ error: error.constructor.name, message: error.message })
                        }

                    })
            } catch (error) {
                if (error instanceof TypeError || error instanceof ContentError) {
                    logger.warn(error.message)

                    res.status(406).json({ error: error.constructor.name, message: error.message })
                } else {
                    logger.warn(error.message)

                    res.status(500).json({ error: SystemError.name, message: error.message })
                }
            }
        })

        api.post("/users/auth", jsonBodyParser, (req, res) => {
            try {
                const { username, password } = req.body

                logic.authenticate(username, password)
                    .then(({ userId, role, status }) => {
                        const token = jwt.sign({ sub: userId, role: role, status: status }, JWT_SECRET)

                        res.json(token)
                    })
                    .catch(error => {
                        console.log(error)
                        if (error instanceof SystemError) {
                            logger.error(error.message)

                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof CredentialsError) {
                            logger.warn(error.message)

                            res.status(401).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof NotFoundError) {
                            logger.warn(error.message)

                            res.status(404).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof UnauthorizedError) {
                            logger.warn(error.message)

                            res.status(401).json({ error: error.constructor.name, message: error.message })
                        }
                    })

            } catch (error) {
                if (error instanceof TypeError || error instanceof ContentError) {
                    logger.warn(error.message)

                    res.status(406).json({ error: error.constructor.name, message: error.message })

                } else {
                    logger.warn(error.message)

                    res.status(500).json({ error: SystemError.name, message: error.message })
                }
            }
        })

        api.get("/users/:targetUserId", jsonBodyParser, (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { targetUserId } = req.params

                logic.retrieveUser(userId as string, targetUserId)
                    .then(user => {
                        logger.info(user)
                        res.json(user)
                    })
                    .catch(error => {
                        if (error instanceof SystemError) {
                            logger.error(error.message)

                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof NotFoundError) {
                            logger.warn(error.message)

                            res.status(404).json({ error: error.constructor.name, message: error.message })
                        }

                    })

            } catch (error) {
                if (error instanceof TypeError || error instanceof ContentError) {
                    logger.warn(error.message)

                    res.status(406).json({ error: error.constructor.name, message: error.message })

                } else if (error instanceof TokenExpiredError) {
                    logger.warn(error.message)

                    res.status(498).json({ error: UnauthorizedError.name, message: "session expired" })
                } else {
                    logger.warn(error.message)

                    res.status(500).json({ error: SystemError.name, message: error.message })
                }
            }
        })

        api.post("/organizations", jsonBodyParser, (req, res) => {
            try {
                const { name, username, email, password, location, address, description } = req.body

                logic.registerOrg(name, username, email, password, location, address, description)
                    .then(() => res.status(201).send())
                    .catch(error => {
                        if (error instanceof SystemError) {
                            logger.error(error.message)

                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof DuplicityError) {
                            logger.warn(error.message)

                            res.status(409).json({ error: error.constructor.name, message: error.message })
                        }

                    })
            } catch (error) {
                if (error instanceof TypeError || error instanceof ContentError) {
                    logger.warn(error.message)

                    res.status(406).json({ error: error.constructor.name, message: error.message })
                } else {
                    logger.warn(error.message)

                    res.status(500).json({ error: SystemError.name, message: error.message })
                }
            }
        })



        // api.get("/events", (req, res) => {
        //     try {
        //         const { authorization } = req.headers

        //         const token = authorization.slice(7)

        //         const { sub: userId } = jwt.verify(token, JWT_SECRET)

        //         logic.retrieveEvents(userId as string)
        //             .then(events => res.json(events))
        //             .catch(error => {
        //                 if (error instanceof SystemError) {
        //                     logger.error(error.message)

        //                     res.status(500).json({ error: error.constructor.name, message: error.message })
        //                 } else if (error instanceof NotFoundError) {
        //                     logger.warn(error.message)

        //                     res.status(404).json({ error: error.constructor.name, message: error.message })
        //                 }
        //             })

        //     } catch (error) {
        //         if (error instanceof TypeError || error instanceof ContentError) {
        //             logger.warn(error.message)

        //             res.status(406).json({ error: error.constructor.name, message: error.message })
        //         } else {
        //             logger.warn(error.message)

        //             res.status(500).json({ error: SystemError.name, message: error.message })
        //         }
        //     }
        // })

        api.get("/events/*", (req, res) => {
            try {
                const { organizationId, location, price, date, categories } = req.query

                logic.findEvents({ organizationId, location, price, date, categories })
                    .then(events => res.json(events))
                    .catch(error => {
                        if (error instanceof SystemError) {
                            logger.error(error.message)

                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof NotFoundError) {
                            logger.warn(error.message)

                            res.status(404).json({ error: error.constructor.name, message: error.message })
                        }
                    })

            } catch (error) {
                if (error instanceof TypeError || error instanceof ContentError) {
                    logger.warn(error.message)

                    res.status(406).json({ error: error.constructor.name, message: error.message })
                } else {
                    logger.warn(error.message)

                    res.status(500).json({ error: SystemError.name, message: error.message })
                }
            }
        })

        // api.get("/events/org/:targetAuthorId", (req, res) => {
        //     try {
        //         const { authorization } = req.headers

        //         const token = authorization.slice(7)

        //         const { sub: userId } = jwt.verify(token, JWT_SECRET)

        //         const { targetAuthorId } = req.params

        //         logic.retrieveEventsByAuthor(userId as string, targetAuthorId)
        //             .then(events => res.json(events))
        //             .catch(error => {
        //                 if (error instanceof SystemError) {
        //                     logger.error(error.message)

        //                     res.status(500).json({ error: error.constructor.name, message: error.message })
        //                 } else if (error instanceof NotFoundError) {
        //                     logger.warn(error.message)

        //                     res.status(404).json({ error: error.constructor.name, message: error.message })
        //                 }
        //             })

        //     } catch (error) {
        //         if (error instanceof TypeError || error instanceof ContentError) {
        //             logger.warn(error.message)

        //             res.status(406).json({ error: error.constructor.name, message: error.message })
        //         } else {
        //             logger.warn(error.message)

        //             res.status(500).json({ error: SystemError.name, message: error.message })
        //         }
        //     }
        // })

        api.post("/events", jsonBodyParser, (req, res) => {
            try {
                const { authorization } = req.headers

                if (!authorization) {
                    return res.status(401).json({ error: 'Unauthorized', message: 'Authorization header missing' });
                }
                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { title, date, time, description, price, city, address } = req.body

                logic.createEvent(userId as string, title, date, time, description, price, city, address)
                    .then(() => res.status(201).send())
                    .catch(error => {
                        if (error instanceof SystemError) {
                            logger.error(error.message)

                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof NotFoundError) {
                            logger.warn(error.message)

                            res.status(404).json({ error: error.constructor.name, message: error.message })

                        }
                    })

            } catch (error) {
                if (error instanceof TypeError || error instanceof ContentError) {
                    logger.warn(error.message)

                    res.status(406).json({ error: error.constructor.name, message: error.message })
                } else {
                    logger.warn(error.message)

                    res.status(500).json({ error: SystemError.name, message: error.message })
                }
            }
        })

        api.delete("/events/:idEventDelete", (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { idEventDelete } = req.params

                logic.deleteEvent(userId, idEventDelete)
                    .then(() => res.status(200).send())
                    .catch(error => {
                        if (error instanceof SystemError) {
                            logger.error(error.message)

                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof NotFoundError) {
                            logger.warn(error.message)

                            res.status(404).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof UnauthorizedError) {
                            logger.warn(error.message)

                            res.status(401).json({ error: error.constructor.name, message: error.message })
                        }
                    })

            } catch (error) {
                if (error instanceof TypeError || error instanceof ContentError) {
                    logger.warn(error.message)

                    res.status(406).json({ error: error.constructor.name, message: error.message })
                } else {
                    logger.warn(error.message)

                    res.status(500).json({ error: SystemError.name, message: error.message })
                }
            }
        })


        api.patch("/user/savedEvents/:eventId", (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { eventId } = req.params

                logic.saveEvent(userId, eventId)
                    .then(() => res.status(200).send())
                    .catch(error => {
                        if (error instanceof SystemError) {
                            logger.error(error.message)

                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof NotFoundError) {
                            logger.warn(error.message)

                            res.status(404).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof DuplicityError) {
                            logger.warn(error.message)

                            res.status(409).json({ error: error.constructor.name, message: error.message })
                        }
                    })

            } catch (error) {
                if (error instanceof TypeError || error instanceof ContentError) {
                    logger.warn(error.message)

                    res.status(406).json({ error: error.constructor.name, message: error.message })
                } else {
                    logger.warn(error.message)

                    res.status(500).json({ error: SystemError.name, message: error.message })
                }
            }
        })

        api.delete("/user/savedEvents/:eventId", (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { eventId } = req.params

                logic.removeEvent(userId, eventId)
                    .then(() => res.status(200).send())
                    .catch(error => {
                        if (error instanceof SystemError) {
                            logger.error(error.message)

                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof NotFoundError) {
                            logger.warn(error.message)

                            res.status(404).json({ error: error.constructor.name, message: error.message })
                        }
                    })

            } catch (error) {
                if (error instanceof TypeError || error instanceof ContentError) {
                    logger.warn(error.message)

                    res.status(406).json({ error: error.constructor.name, message: error.message })
                } else {
                    logger.warn(error.message)

                    res.status(500).json({ error: SystemError.name, message: error.message })
                }
            }
        })


        api.listen(PORT, () => logger.info(`API listening on port ${PORT}`))
    })
    .catch(error => logger.error(error))