// @ts-nocheck
import AsyncStorage from "@react-native-async-storage/async-storage"
import { validate, errors } from "../com/index.js"
function createEvent(title: string, city: string, address: string, description: string, time: string, price: number, date: string) {
    validate.text(title, "title")
    validate.text(city, "city")
    validate.text(address, "address")
    validate.text(description, "description")
    validate.date(date, "date")

    return AsyncStorage.getItem("token")
        .then(token => {
            validate.token(token)

            const ev = { title, date, time, description, price, city, address }

            const json = JSON.parse(ev)

            return fetch("http://192.168.1.128:9000/events", {
                method: "POST",
                headers: {
                    "Athorization": `Bearer ${token}`,
                    "content-type": "application/json"
                },
                body: json
            })
                .then(res => {
                    if (res.status === 201) return

                    return res.json()
                        .then(body => {
                            const { error, message } = body

                            const constructor = errors[error]

                            throw new constructor(error)
                        })
                })
        })

}

export default createEvent