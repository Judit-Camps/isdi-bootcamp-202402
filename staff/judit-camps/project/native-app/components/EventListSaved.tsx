// @ts-nocheck
import logic from "../logic"
import { useState, useEffect } from "react"
import { View, Text, StyleSheet } from "react-native"
import Event from "./Event"

export default function EventListSaved({ stamp, userId }) {
    const [events, setEvents] = useState(null)

    const loadEvents = () => {
        try {
            logic.retrieveSavedEvents(userId)
                .then(events => {
                    setEvents(events)
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
                <Text>Aquesta organització encara no ha penjat cap activitat</Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    eventListContainer: {
        backgroundColor: 'red',
        marginBottom: 100,

    }
})