// @ts-nocheck
import logic from "../logic"
import { useState, useEffect } from "react"
import { View, Text } from "react-native"
import Event from "./Event"

export default function EventList({ stamp }) {
    const [events, setEvents] = useState(null)

    const loadEvents = () => {
        try {
            logic.retrieveEvents()
                .then(events => {
                    setEvents(events)
                    console.log("--->", events)
                })
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        loadEvents()
    }, [stamp])

    return (

        <View>
            {events && events.length > 0 ? (
                events.map(ev =>
                    <Event key={ev.id} item={ev} />
                )
            ) : (
                <Text>No events available</Text>
            )}

        </View>
    )
}