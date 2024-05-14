// @ts-nocheck
import { validate, errors } from "../com/index.js";

function findEvents(options = {}) {

    const { organization, location, price, date, categories } = options

    const params = new URLSearchParams()
    if (organization) {
        validate.text(organization, "organizationId", true)
        params.append("organizationId", organization)
    }
    if (location) {
        validate.text(location, "location")
        params.append("location", encodeURIComponent(location))
    }
    if (date) {
        validate.date(date, "date")
        params.append("date", date)
    }
    if (price || price === 0) {
        params.append("price", price.toString())
    }
    if (categories) {
        categories.forEach(category => params.append("categories[]", encodeURIComponent(category)))
    }

    const queryString = params.toString();
    const url = `${process.env.EXPO_PUBLIC_API_URL}/events/${queryString ? `?${queryString}` : ''}`;

    console.log("logic - findEvents - url: ", url)

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