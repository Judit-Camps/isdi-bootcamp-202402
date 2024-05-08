// @ts-nocheck
import { View, Text, TouchableOpacity, Alert } from "react-native"
import { AntDesign, FontAwesome } from '@expo/vector-icons'
import { useState, useEffect } from "react"
import { useContext } from "../context"
import logic from "../logic"
import eventStyles from "./EventStyles"

export default function Event({ item: ev, onAuthorClicked, onDeleted }) {
    const [pressedBookmark, setPressedBookmark] = useState(false)
    // const [pressedMoreInfo, setPressedMoreInfo] = useState(false)
    const [expanded, setExpanded] = useState(null)

    const { user, role, setStamp } = useContext()

    useEffect(() => {
        if (user)
            try {
                logic.isUserInEvent(ev)
                    .then(result => {
                        console.log("-------", result)
                        if (result) setPressedBookmark(true)
                        else setPressedBookmark(false)
                    })
            } catch (error) {
                console.error(error)
            }
    }, [user, ev])

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
        setPressedBookmark(true)
        console.log(ev.id)
        try {
            logic.saveEvent(ev.id)
                .catch(error => {
                    console.error(error)
                })
                .then(() => {
                    Alert.alert("esdeveniment guardat a preferits")
                    setStamp(Date.now())
                })


        } catch (error) {
            console.error(error)
        }
    }

    const handleEventRemove = () => {
        setPressedBookmark(false)
        try {
            logic.removeEvent(ev.id)
                .catch(error => {
                    console.error(error)
                })
                .then(() => {
                    Alert.alert("esdeveniment borrat de preferits")
                    setStamp(Date.now())
                })

        } catch (error) {
            console.error(error)
        }

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
            <View style={eventStyles.eventContainer}>
                <Text style={eventStyles.eventTitle}>{ev.title}</Text>
                {(!user || (role === "organization" && ev.author.name !== user.name)) ? null :
                    ((role === "organization" && ev.author.name === user.name) ? (
                        <AntDesign style={eventStyles.topIcon} name="edit" size={32} color="#0A6847"
                            onPress={handleEditPress}
                        />
                    ) : (
                        pressedBookmark ? (
                            <FontAwesome style={eventStyles.topIcon} name="bookmark" size={32} color="#0A6847" onPress={handleEventRemove}
                            />
                        ) : (
                            <FontAwesome
                                style={eventStyles.topIcon}
                                name="bookmark-o"
                                size={32}
                                color="#0A6847"
                                onPress={handleEventSave}
                            />
                        )
                    ))
                }

                <TouchableOpacity onPress={() => handleEventAuthorPress(ev.author)}>
                    <Text style={eventStyles.eventOrganization}>{ev.author.name}</Text>
                </TouchableOpacity>
                <Text style={eventStyles.eventLocation}>{ev.city}</Text>
                <Text style={[eventStyles.description, { maxHeight: expanded ? '100%' : 40 }]} numberOfLines={expanded ? null : 1}>
                    {ev.description}
                </Text>
                {expanded && (
                    <>
                        <Text style={eventStyles.moreInfo}>Hora: {ev.time}</Text>
                        <Text style={eventStyles.moreInfo}>Preu: {price}</Text>

                        <Text> Guardat per:</Text>
                        {ev.attendees.map(p =>
                            <Text key={p.id} >{p.username}</Text>
                        )}
                    </>
                )}

                {(user && role === "organization" && ev.author.name === user.name) &&
                    <AntDesign style={eventStyles.deleteIcon} name="delete" size={30} color="#0A6847"
                        onPress={() => handleDeletePress(ev.id)}
                    />
                }
            </View>
        </TouchableOpacity>
    )
}
