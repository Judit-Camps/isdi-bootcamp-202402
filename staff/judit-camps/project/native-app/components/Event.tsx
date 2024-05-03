// @ts-nocheck
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native"
import { AntDesign, FontAwesome } from '@expo/vector-icons'
import { useState } from "react"
import { useContext } from "../context"

export default function Event({ item: ev, onAuthorClicked }) {
    const [pressedBookmark, setPressedBookmark] = useState(false)
    // const [pressedMoreInfo, setPressedMoreInfo] = useState(false)
    const [expanded, setExpanded] = useState(false)
    const { user, role } = useContext()

    const handleEventAuthorPress = (author) => {
        onAuthorClicked(author)
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
                {!user ? null :
                    ((role === "organization" && ev.author.name === user.name) ? (
                        <AntDesign style={styles.bookmarkIcon} name="edit" size={32} color="#0A6847"
                            onPress={handleEditPress}
                        />
                    ) : (
                        pressedBookmark ? (
                            <FontAwesome style={styles.bookmarkIcon} name="bookmark" size={32} color="#0A6847" onPress={handleEventRemove}
                            />
                        ) : (
                            <FontAwesome
                                style={styles.bookmarkIcon}
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
    bookmarkIcon: {
        position: 'absolute',
        right: 12,
        top: 12,
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
