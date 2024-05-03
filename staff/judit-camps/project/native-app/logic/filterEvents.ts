import { validate } from "../com/index.js";

function filterEvents(organizationId?: string, location?: string, price?: number, date?: string, categories?: string[]) {
    if (organizationId) validate.text(organizationId, "organizationId", true)
    if (location) validate.text(location, "location")
    if (date) validate.date(date, "date")


    const filters = {}

    const json = JSON.stringify(filters)

    return fetch(`${process.env.EXPO_PUBLIC_API_URL}/users/auth`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: json
    })
}