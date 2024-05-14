// @ts-nocheck
import { View, Text, StyleSheet, Pressable } from "react-native"
import Event from "./Event"
import { useContext } from "../context"

export default function EventList({ events, onEventAuthorClick, onEditEventClick, textOnEmptyList }) {
    const { setStamp } = useContext()

    const handleEventDeleted = () => setStamp(Date.now())


    const handleEventAuthorClicked = (author) => {
        if (onEventAuthorClick)
            onEventAuthorClick(author)
    }

    const handleEditClick = (ev) => {
        onEditEventClick(ev)
    }

    return (
        <View style={styles.eventListContainer}>
            {events && events.length > 0 ? (
                events.map(ev =>
                    <Event key={ev.id} item={ev} onAuthorClicked={handleEventAuthorClicked} onEditClick={handleEditClick} onDeleted={handleEventDeleted} />
                )
            ) : (
                <View style={{ display: "flex", alignItems: "center", paddingTop: 24, marginBottom: 300 }}>
                    <Text style={{ fontSize: 16 }}>{textOnEmptyList}</Text>
                </View>

            )}
        </View>
    )
}

const styles = StyleSheet.create({
    eventListContainer: {
        marginBottom: 100
    },
    button: {
        width: "20%",
        height: 48,
        backgroundColor: "#7ABA78",
        borderRadius: 24,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
})