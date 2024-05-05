// @ts-nocheck
import { validate, errors } from "../com/index.js";

function findEvents(organizationId?: string, location?: string, price?: number, date?: string, categories?: string[]) {

    const params = new URLSearchParams()
    if (organizationId) {
        validate.text(organizationId, "organizationId", true)
        params.append("organizationId", organizationId)
    }
    if (location) {
        validate.text(location, "location")
        params.append("location", encodeURIComponent(location))
    }
    if (date) {
        validate.date(date, "date")
        params.append("date", date)
    }
    if (price) {
        params.append("price", price.toString())
    }
    if (categories) {
        params.append("categories", categories.map(category => encodeURIComponent(category)).join(","))
    }

    const queryString = params.toString()
    const url = `${process.env.EXPO_PUBLIC_API_URL}/events/${queryString ? `?q=${queryString}` : ''}`;

    return fetch(url, {})
        .then(res => {
            if (res.status === 200)
                return res.json()

            return res.json()
                .then(body => {
                    const { error, message } = body
                    const constructor = errors[error]
                    throw new constructor(message)
                })
        })
}

export default findEvents