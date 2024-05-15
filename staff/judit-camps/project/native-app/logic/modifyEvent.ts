// @ts-nocheck
import AsyncStorage from "@react-native-async-storage/async-storage"
import { validate, errors } from "../com/index.js"

function modifyEvent(eventId: string, title?: string, city?: string, address?: string, description?: string, time?: string, price?: number, date?: string, categories?: string[]) {
    validate.text(eventId, "eventID", true)
    validate.text(title, "title")
    validate.text(city, "city")
    validate.text(address, "address")
    validate.text(description, "description")
    validate.date(date, "date")

    return AsyncStorage.getItem("token")
        .then(token => {
            validate.token(token)

            const ev = {
                title,
                date,
                time,
                description,
                price,
                city,
                address,
                categories
            }

            const json = JSON.stringify(ev)

            return fetch(`${process.env.EXPO_PUBLIC_API_URL}/events/${eventId}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "content-type": "application/json"
                },
                body: json
            })
                .then(res => {
                    if (res.status === 200) return

                    return res.json()
                        .then(body => {
                            const { error, message } = body

                            const constructor = errors[error]

                            throw new constructor(message)
                        })
                })
        })

}

export default modifyEvent