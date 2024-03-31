import fs from 'fs'
import Collection from "./Collection.mjs"
import { expect } from 'chai'
import { error } from 'console'

describe('Collection', () => {
    describe('>constructor', () => {
        it('creates a collection', () => {

            const cars = new Collection('cars')

            expect(cars).to.be.instanceOf(Collection)
        })
    })

    describe('>helpers', () => {
        describe('_generateId', () => {
            it('generates random IDs', () => {
                const cars = new Collection('cars')

                const ran1 = cars._generateId()
                expect(typeof ran1).to.equal('string')

                const ran2 = cars._generateId()
                expect(typeof ran2).to.equal('string')

                expect(ran1 === ran2).to.equal(false)
            })
        })

        describe('_loadDocuments', () => {
            it('loads empty array on new collection', done => {
                // rewrite the document with [] to delete its content
                fs.writeFile('./data/cars.json', '[]', error => {
                    if (error) {
                        console.error(error)
                        return
                    }

                    const cars = new Collection('cars')

                    cars._loadDocuments((error, documents) => {
                        if (error) {
                            console.error(error)
                            return
                        }
                        expect(error).to.be.null
                        expect(documents).to.be.instanceOf(Array)
                        expect(documents).to.be.lengthOf(0)

                        // we add this done for the functions to act as if they were syncronized
                        done()
                    })
                })
            })

            it('load existing array to new collection', done => {

                fs.writeFile('./data/cars.json', '[{"brand":"seat","model":"ibiza"},{"brand":"VW","model":"golf"}]', error => {
                    if (error) {
                        console.error(error)
                        return
                    }

                    const cars = new Collection('cars')

                    cars._loadDocuments((error, documents) => {
                        if (error) {
                            console.error(error)
                            return
                        }

                        expect(error).to.be.null
                        expect(documents).to.be.instanceOf(Array)
                        expect
                        expect(documents).to.be.lengthOf(2)

                        let document = documents[0]
                        expect(document).to.be.instanceOf(Object)
                        expect(document.brand).to.equal("seat")
                        expect(document.model).to.equal("ibiza")

                        document = documents[1]
                        expect(document).to.be.instanceOf(Object)
                        expect(document.brand).to.equal("VW")
                        expect(document.model).to.equal("golf")

                        done()
                    })
                })
            })
        })

        describe('_saveDocuments', () => {
            it('saves a collection', done => {
                fs.writeFile('./data/cars.json', '[]', error => {
                    if (error) {
                        console.error(error)
                        return
                    }

                    const documents = [{ brand: "seat", model: "ibiza" }, { brand: "VW", model: "golf" }]

                    const cars = new Collection('cars')

                    cars._saveDocuments(documents, error => {
                        if (error) {
                            console.error(error)
                            return
                        }

                        expect(error).to.be.null

                        fs.readFile('./data/cars.json', 'utf8', (error, documentsJSON) => {
                            if (error) {
                                console.error(error)
                                return
                            }

                            expect(documentsJSON).to.equal(JSON.stringify(documents))

                            done()
                        })
                    })
                })
            })

            it('fails on non-array documents', done => {

                const documents = 'hello'
                const cars = new Collection('cars')

                let errorThrown
                try {
                    cars._saveDocuments(documents, () => { })

                } catch (error) {
                    errorThrown = error
                }

                expect(errorThrown).to.be.instanceOf(TypeError)
                expect(errorThrown.message).to.equal('documents is not an array')

                done()
            })

            it('fails on array with non-object document', done => {

                const documents = [{ brand: "seat", model: "ibiza" }, { brand: "VW", model: "golf" }, 'hello']

                const cars = new Collection('cars')

                let errorThrown
                try {
                    cars._saveDocuments(documents, () => { })
                } catch (error) {
                    errorThrown = error
                }

                expect(errorThrown).to.be.instanceOf(TypeError)
                expect(errorThrown.message).to.equal('a document in documents is not an array')

                done()
            })
        })

    })

    describe('>CRUD', () => {
        describe('findOne', () => {
            it('finds an existing document', done => {

                fs.writeFile('./data/cars.json', '[{"brand":"seat","model":"ibiza"},{"brand":"VW","model":"golf"}]', error => {
                    if (error) {
                        console.error(error)
                        return
                    }

                    const cars = new Collection('cars')

                    cars.findOne(car => car.brand === 'seat', (error, car) => {
                        if (error) {
                            console.error(error)
                            return
                        }

                        expect(error).to.be.null

                        expect(car).to.be.instanceOf(Object)
                        expect(car.brand).to.equal('seat')
                        expect(car.model).to.equal('ibiza')

                        done()
                    })

                })
            })

            it('returns null on non-existing document', done => {

                fs.writeFile('./data/cars.json', '[{"brand":"seat","model":"ibiza"}]', error => {
                    if (error) {
                        console.error(error)
                        return
                    }

                    const cars = new Collection('cars')

                    cars.findOne(car => car.brand === 'VW', (error, car) => {
                        if (error) {
                            console.error(error)
                            return
                        }

                        expect(error).to.be.null
                        expect(car).to.be.null

                        done()
                    })

                })
            })


            it('fails on no callback', done => {

                const cars = new Collection('cars')

                let errorThrown
                try {
                    cars.findOne()
                } catch (error) {
                    errorThrown = error
                }

                expect(errorThrown).to.be.instanceOf(TypeError)
                expect(errorThrown.message).to.equal('condition callback is not a function')

                done()

            })

            it('fails on non-function callback', done => {
                const cars = new Collection('cars')

                let errorThrown
                try {
                    cars.findOne(123)
                } catch (error) {
                    errorThrown = error
                }

                expect(errorThrown).to.be.instanceOf(TypeError)
                expect(errorThrown.message).to.equal('condition callback is not a function')

                done()
            })
        })

        describe('insertOne', () => {
            it('adds new document to empty array', done => {
                fs.writeFile('./data/cars.json', '[]', error => {
                    if (error) {
                        console.error(error)
                        return
                    }

                    const document = { brand: "seat", model: "ibiza" }



                    const cars = new Collection('cars')

                    cars.insertOne(document, error => {
                        if (error) {
                            console.error(error)
                            return
                        }

                        cars._loadDocuments((error, documents) => {
                            if (error) {
                                console.error(error)
                                return
                            }

                            const document = documents[0]
                            expect(document.brand).to.equal('seat')
                            expect(document.model).to.equal('ibiza')

                            done()
                        })
                    })
                })
            })

            it('adds new document existing array', done => {
                const cars = new Collection('cars')
                const document = { brand: "VW", model: "golf" }

                cars.insertOne(document, error => {
                    if (error) {
                        console.error(error)
                        return
                    }

                    cars._loadDocuments((error, documents) => {
                        if (error) {
                            console.error(error)
                            return
                        }

                        const car1 = documents[0]
                        const car2 = documents[1]
                        expect(car1.brand).to.equal('seat')
                        expect(car1.model).to.equal('ibiza')

                        expect(car2.brand).to.equal('VW')
                        expect(car2.model).to.equal('golf')

                        done()

                    })
                })

            })

            it('fails on empty document', done => {

                fs.writeFile('./data/cars.json', '[]', error => {
                    if (error) {
                        console.error(error)
                        return
                    }
                    const cars = new Collection('cars')

                    let errorThrown
                    try {
                        cars.insertOne()
                    } catch (error) {
                        errorThrown = error
                    }
                    expect(errorThrown).to.be.instanceOf(TypeError)
                    expect(errorThrown.message).to.equal('document is not an object')

                    done()

                })
            })

            it('fails on non-object document', done => {
                fs.writeFile('./data/cars.json', '[]', error => {
                    if (error) {
                        console.error(error)
                        return
                    }
                    const cars = new Collection('cars')

                    let errorThrown
                    try {
                        cars.insertOne(111)
                    } catch (error) {
                        errorThrown = error
                    }
                    expect(errorThrown).to.be.instanceOf(TypeError)
                    expect(errorThrown.message).to.equal('document is not an object')

                    done()
                })
            })

            it('fails on no callback', done => {
                const cars = new Collection('cars')

                let errorThrown
                try {
                    cars.insertOne({})

                } catch (error) {
                    errorThrown = error
                }

                expect(errorThrown).to.be.instanceOf(TypeError)
                expect(errorThrown.message).to.equal('callback is not a function')

                done()
            })
        })



        describe('updateOne', () => {
            it('updates one document', done => {
                const docu = [{ id: '123', brand: 'seat', model: 'ibiza' }, { id: '456', brand: 'VW', model: 'golf' }]
                const docuJSON = JSON.stringify(docu)
                fs.writeFile('./data/cars.json', docuJSON, error => {
                    if (error) {
                        console.error(error)
                        return
                    }

                    const newDoc = { id: '123', brand: 'seat', model: 'leon' }
                    const cars = new Collection('cars')

                    cars.updateOne(car => car.id === '123', newDoc, (error, updated) => {
                        if (error) {
                            console.error(error)
                            return
                        }
                        expect(updated).to.be.true

                        fs.readFile('./data/cars.json', 'utf8', (error, documentJSON) => {
                            if (error) {
                                console.error(error)
                                return
                            }
                            const documents = JSON.parse(documentJSON)
                            expect(documents).to.be.lengthOf(2)
                            expect(documents[0]).to.deep.equal(newDoc)

                            done()

                        })

                    })

                })
            })

            it('does not update a non-existent document', done => {
                const documents = [{ id: '123', brand: 'seat', model: 'ibiza' }, { id: '456', brand: 'VW', model: 'golf' }]
                const docuJSON = JSON.stringify(documents)
                fs.writeFile('./data/cars.json', docuJSON, error => {
                    if (error) {
                        console.error(error)
                        return
                    }

                    const newDoc = { id: '123', brand: 'seat', model: 'leon' }
                    const cars = new Collection('cars')

                    cars.updateOne(car => car.id === '789', newDoc, (error, updated) => {
                        if (error) {
                            console.error(error)
                            return
                        }
                        expect(updated).to.be.false

                        fs.readFile('./data/cars.json', 'utf8', (error, documentJSON) => {
                            if (error) {
                                console.error(error)
                                return
                            }
                            const documents2 = JSON.parse(documentJSON)
                            expect(documents2).to.deep.equal(documents)

                            done()

                        })

                    })
                })
            })

            it('fails on no condition callback', done => {
                const cars = new Collection('cars')

                let errorThrown
                try {
                    cars.updateOne()

                } catch (error) {
                    errorThrown = error
                }

                expect(errorThrown).to.be.instanceOf(TypeError)
                expect(errorThrown.message).to.equal('condition callback is not a function')

                done()
            })

            it('fails on empty document', () => {
                const cars = new Collection('cars')

                let errorThrown
                try {
                    cars.updateOne(() => { })
                } catch (error) {
                    errorThrown = error
                }

                expect(errorThrown).to.be.instanceOf(TypeError)
                expect(errorThrown.message).to.equal('document is not an object')

            })


            it('fails on no callback', done => {
                const cars = new Collection('cars')

                let errorThrown
                try {
                    cars.updateOne(() => { }, {})
                } catch (error) {
                    errorThrown = error
                }

                expect(errorThrown).to.be.instanceOf(TypeError)
                expect(errorThrown.message).to.equal('callback is not a function')
                done()
            })


            it('fails on non-object document', () => {
                const cars = new Collection('cars')

                let errorThrown
                try {
                    cars.updateOne(() => { }, 'hello')
                } catch (error) {
                    errorThrown = error
                }

                expect(errorThrown).to.be.instanceOf(TypeError)
                expect(errorThrown.message).to.equal('document is not an object')

            })

        })


        describe('deleteOne', () => {
            it('deletes one document from array', done => {

                const documents = [{ id: '123', brand: 'seat', model: 'ibiza' }, { id: '456', brand: 'VW', model: 'golf' }]
                const documentsJSON = JSON.stringify(documents)
                fs.writeFile('./data.cars.json', documentsJSON, error => {
                    if (error) {
                        done(error)
                        return
                    }

                    const cars = new Collection('cars')

                    cars.deleteOne(car => car.id === '123', (error, deleted) => {
                        if (error) {
                            done(error)
                            return

                        }

                        expect(deleted).to.be.true

                        fs.readFile('./data/cars.json', 'utf8', (error, documentsJSON) => {
                            if (error) {
                                done(error)
                                return
                            }

                            const documents2 = JSON.parse(documentsJSON)
                            expect(documents2).to.be.lengthOf(1)
                            expect(documents2[0]).to.deep.equal(documents[1])

                            done()
                        })

                    })
                })
            })


            it('does not delete non-existing document', done => {
                const documents = [{ id: '123', brand: 'seat', model: 'ibiza' }, { id: '456', brand: 'VW', model: 'golf' }]
                const documentsJSON = JSON.stringify(documents)

                fs.writeFile('./data/cars.json', documentsJSON, error => {
                    if (error) {
                        done(error)
                        return
                    }

                    const cars = new Collection('cars')

                    cars.deleteOne(car => car.id === '789', (error, deleted) => {
                        if (error) {
                            done(error)
                            return
                        }

                        expect(deleted).to.be.false

                        fs.readFile('./data/cars.json', 'utf8', (error, documentsJSON) => {
                            if (error) {
                                done(error)
                                return
                            }

                            const documents2 = JSON.parse(documentsJSON)

                            expect(documents2).to.deep.equal(documents)

                            done()
                        })

                    })
                })
            })



            it('fails on empty condition', done => {
                const cars = new Collection('cars')

                let errorThrown
                try {
                    cars.deleteOne()
                } catch (error) {
                    errorThrown = error
                }

                expect(errorThrown).to.be.instanceOf(TypeError)
                expect(errorThrown.message).to.equal('condition callback is not a function')

                done()
            })

            it('fails on no callback', () => {
                const cars = new Collection('cars')

                let errorThrown
                try {
                    cars.deleteOne(() => { })
                } catch (error) {
                    errorThrown = error
                }

                expect(errorThrown).to.be.instanceOf(TypeError)
                expect(errorThrown.message).to.equal('callback is not a function')

            })

        })



        describe('getAll', () => {
            it('returns empty array if json is empty', done => {
                fs.writeFile('./data/cars.json', '[]', error => {
                    if (error) {
                        console.error(error)
                        return
                    }

                    const cars = new Collection('cars')

                    cars.getAll((error, documents) => {
                        if (error) {
                            console.error(error)
                            return
                        }
                        expect(documents).to.be.instanceOf(Array)
                        expect(documents).to.be.lengthOf(0)

                        done()
                    })
                })
            })


            it('returns array if json has info', done => {
                fs.writeFile('./data/cars.json', '[{"brand":"seat","model":"ibiza"}]', error => {
                    if (error) {
                        console.error(error)
                        return
                    }

                    const cars = new Collection('cars')

                    cars.getAll((error, documents) => {
                        if (error) {
                            console.error(error)
                            return
                        }
                        expect(documents).to.be.instanceOf(Array)
                        expect(documents).to.be.lengthOf(1)

                        done()
                    })
                })
            })

            it('fails on no callback', done => {
                const cars = new Collection('cars')

                let errorThrown
                try {
                    cars.getAll()

                } catch (error) {
                    errorThrown = error
                }

                expect(errorThrown).to.be.instanceOf(TypeError)

                expect(errorThrown.message).to.equal('callback is not a function')

                done()

            })
        })
    })
})