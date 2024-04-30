// @ts-nocheck
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { FontAwesome } from '@expo/vector-icons'
import { useState } from "react"
import { useContext } from "../context"

export default function Event({ item: ev }) {
    const [pressedBookmark, setPressedBookmark] = useState(false)
    const [expanded, setExpanded] = useState(false)
    const { user } = useContext()

    const toggleExpanded = () => {
        setExpanded(!expanded)
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
                {!user ? null : (
                    pressedBookmark ? (
                        <FontAwesome style={styles.bookmarkIcon} name="bookmark" size={28} color="black" onPress={() => setPressedBookmark(!pressedBookmark)}
                        />
                    ) : (
                        <FontAwesome
                            style={styles.bookmarkIcon}
                            name="bookmark-o"
                            size={28}
                            color="black"
                            onPress={() => setPressedBookmark(!pressedBookmark)}
                        />
                    ))}
                <Text style={styles.eventOrganization}>{ev.author.name}</Text>
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
        backgroundColor: 'grey',
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
    },
    eventLocation: {
        fontSize: 16,
    },
    description: {
        fontSize: 16,
    },
    moreInfo: {
        fontSize: 16,
        marginTop: 8,
    },
})
