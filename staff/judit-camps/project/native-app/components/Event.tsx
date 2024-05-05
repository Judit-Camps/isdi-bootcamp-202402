// @ts-nocheck
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native"
import { AntDesign, FontAwesome } from '@expo/vector-icons'
import { useState } from "react"
import { useContext } from "../context"
import logic from "../logic"

export default function Event({ item: ev, onAuthorClicked, navigation, onDeleted }) {
    const [pressedBookmark, setPressedBookmark] = useState(false)
    // const [pressedMoreInfo, setPressedMoreInfo] = useState(false)
    const [expanded, setExpanded] = useState(false)
    const { user, role } = useContext()

    const handleEventAuthorPress = (author) => {
        if (user) {
            onAuthorClicked(author)
        } else Alert.alert("log in to...")
    }

    const toggleExpanded = () => {
        setExpanded(!expanded)
    }

    const handleEditPress = () => {
        Alert.alert("functionality yet to come")
    }

    const handleEventSave = () => {
        setPressedBookmark(!pressedBookmark)
        Alert.alert("this event will be saved")
    }

    const handleEventRemove = () => {
        setPressedBookmark(!pressedBookmark)
        Alert.alert("this event will be removed from saved")

    }

    const handleDeletePress = (eventId) => {
        console.log(eventId)
        try {
            logic.deleteEvent(eventId)
                .then(() => onDeleted())
                .catch(error => console.error(error))
        } catch (error) {
            console.error("-->", error)
        }
    }

    let price = "Entrada lliure"

    if (ev.price === -1) {
        price = "Taquilla inversa"
    } else if (ev.price > 0) {
        price = ev.price
    }

    return (
        <TouchableOpacity onPress={toggleExpanded} activeOpacity={1}>
            <View style={styles.eventContainer}>
                <Text style={styles.eventTitle}>{ev.title}</Text>
                {(!user || (role === "organization" && ev.author.name !== user.name)) ? null :
                    ((role === "organization" && ev.author.name === user.name) ? (
                        <AntDesign style={styles.topIcon} name="edit" size={32} color="#0A6847"
                            onPress={handleEditPress}
                        />
                    ) : (
                        pressedBookmark ? (
                            <FontAwesome style={styles.topIcon} name="bookmark" size={32} color="#0A6847" onPress={handleEventRemove}
                            />
                        ) : (
                            <FontAwesome
                                style={styles.topIcon}
                                name="bookmark-o"
                                size={32}
                                color="#0A6847"
                                onPress={handleEventSave}
                            />
                        )
                    ))
                }

                <TouchableOpacity onPress={() => handleEventAuthorPress(ev.author)}>
                    <Text style={styles.eventOrganization}>{ev.author.name}</Text>
                </TouchableOpacity>
                <Text style={styles.eventLocation}>{ev.city}</Text>
                <Text style={[styles.description, { maxHeight: expanded ? '100%' : 40 }]} numberOfLines={expanded ? null : 1}>
                    {ev.description}
                </Text>
                {expanded && (
                    <>
                        <Text style={styles.moreInfo}>Hora: {ev.time}</Text>
                        <Text style={styles.moreInfo}>Preu: {price}</Text>
                    </>
                )}

                {(user && role === "organization" && ev.author.name === user.name) &&
                    <AntDesign style={styles.deleteIcon} name="delete" size={30} color="#0A6847"
                        onPress={() => handleDeletePress(ev.id)}
                    />
                }
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    eventContainer: {
        backgroundColor: "#F6E9B2",
        borderRadius: 16,
        padding: 16,
        margin: 16,
        minHeight: 180,
    },
    eventTitle: {
        fontSize: 28,
        color: 'black',
    },
    topIcon: {
        position: 'absolute',
        right: 12,
        top: 12,
    },
    deleteIcon: {
        position: 'absolute',
        right: 12,
        bottom: 12,
    },
    eventOrganization: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 6
    },
    eventLocation: {
        fontSize: 16,
        padding: 6
    },
    description: {
        fontSize: 16,
    },
    moreInfo: {
        fontSize: 16,
        marginTop: 8,
    },
})
