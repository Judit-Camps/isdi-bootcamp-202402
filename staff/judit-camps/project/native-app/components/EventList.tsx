// @ts-nocheck
import logic from "../logic"
import { useState, useEffect } from "react"
import { View, Text, StyleSheet } from "react-native"
import Event from "./Event"

export default function EventList({ stamp, onEventAuthorClick }) {
    const [events, setEvents] = useState(null)

    const loadEvents = () => {
        try {
            logic.retrieveEvents()
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


    const handleEventAuthorClicked = (author) => {
        onEventAuthorClick(author)
    }

    return (

        <View style={styles.eventListContainer}>
            {events && events.length > 0 ? (
                events.map(ev =>
                    <Event key={ev.id} item={ev} onAuthorClicked={handleEventAuthorClicked} />
                )
            ) : (
                <Text>No events available</Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    eventListContainer: {
        marginBottom: 80
    }
})