// @ts-nocheck
import logic from "../logic"
import { useState, useEffect } from "react"
import { View, Text, StyleSheet } from "react-native"
import Event from "./Event"

export default function EventList({ stamp, filter, onEventAuthorClick, onEditEventClick }) {
    const [events, setEvents] = useState(null)



    const loadEvents = () => {
        try {
            logic.findEvents(filter)
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


    const handleEventDeleted = () => loadEvents()


    const handleEventAuthorClicked = (author) => {
        onEventAuthorClick(author)
    }

    const handleEditClick = post => {
        onEditEventClick(post)
    }

    return (

        <View style={styles.eventListContainer}>
            {events && events.length > 0 ? (
                events.map(ev =>
                    <Event key={ev.id} item={ev} onAuthorClicked={handleEventAuthorClicked} onEditClick={handleEditClick} onDeleted={handleEventDeleted} />
                )
            ) : (
                <Text>No events available</Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    eventListContainer: {
        marginBottom: 100
    }
})