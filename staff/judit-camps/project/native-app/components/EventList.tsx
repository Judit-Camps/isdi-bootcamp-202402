// @ts-nocheck
import logic from "../logic"
import { useState, useEffect } from "react"
import { View, Text, StyleSheet } from "react-native"
import Event from "./Event"
import { useContext } from "../context"

export default function EventList({ events, onEventAuthorClick, onEditEventClick }) {
    const { setStamp } = useContext()

    const handleEventDeleted = () => setStamp(Date.now())


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