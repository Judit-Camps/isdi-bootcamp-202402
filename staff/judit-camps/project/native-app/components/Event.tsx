// @ts-nocheck
import { View, Text, Pressable, Alert } from "react-native"
import { AntDesign, FontAwesome } from '@expo/vector-icons'
import { useState, useEffect } from "react"
import { useContext } from "../context"
import logic from "../logic"
import eventStyles from "../styles/EventStyles"

export default function Event({ item: ev, onAuthorClicked, onDeleted, onEditClick }) {
    const [pressedBookmark, setPressedBookmark] = useState(false)
    const [expanded, setExpanded] = useState(null)

    const { user, role, setStamp } = useContext()

    useEffect(() => {
        if (user)
            try {
                logic.isUserInEvent(ev)
                    .then(result => {
                        if (result) setPressedBookmark(true)
                        else setPressedBookmark(false)
                    })
            } catch (error) {
                console.error(error)
            }
    }, [user, ev])

    const handleEventAuthorPress = (author) => {
        if (user && onAuthorClicked) {
            onAuthorClicked(author)
        } else Alert.alert("Inicia sessió per veure més")
    }

    const toggleExpanded = () => {
        setExpanded(!expanded)
    }

    const handleEditPress = ev => onEditClick(ev)

    const handleEventSave = () => {
        setPressedBookmark(true)
        try {
            logic.saveEvent(ev.id)
                .catch(error => {
                    console.error(error)
                })
                .then(() => {
                    Alert.alert("Esdeveniment guardat a preferits")
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
                    Alert.alert("Esdeveniment borrat de preferits")
                    setStamp(Date.now())
                })

        } catch (error) {
            console.error(error)

        }
    }

    const handleDeletePress = (eventId) => {
        try {
            logic.deleteEvent(eventId)
                .then(() => {
                    Alert.alert("Esdeveniment borrat correctament")
                    onDeleted()
                })
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
        <>
            <View style={eventStyles.eventContainer}>
                <Text style={eventStyles.eventTitle}>{ev.title}</Text>
                {(!user || (role === "organization" && ev.author.name !== user.name)) ? null :
                    ((role === "organization" && ev.author.name === user.name) ? (
                        <AntDesign style={eventStyles.topIcon} name="edit" size={32} color="#0A6847"
                            onPress={() => handleEditPress(ev)}
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

                <Pressable onPress={() => handleEventAuthorPress(ev.author)}>
                    <Text style={eventStyles.eventOrganization}>{ev.author.name}</Text>
                </Pressable>
                <Text style={eventStyles.eventLocation}>{ev.city}</Text>
                <Text style={eventStyles.moreInfo}>{ev.dateText}</Text>

                {expanded && (
                    <>
                        <Text style={eventStyles.description} >{ev.description}</Text>
                        <Text style={eventStyles.moreInfo}>Hora: {ev.time}</Text>
                        {typeof price === "number" ? (
                            <Text style={eventStyles.moreInfo}>Preu: {price}€</Text>
                        ) : (
                            <Text style={eventStyles.moreInfo}>Preu: {price}</Text>
                        )}

                        {ev.attendees.length > 0 && (
                            <View>
                                <Text numberOfLines={1}>Guardat per: {ev.attendees.sort().map(p =>
                                    <Text key={p.id}>{p.username}</Text>
                                )} </Text>

                            </View>
                        )}
                    </>
                )}

                {(user && role === "organization" && ev.author.name === user.name) &&
                    <AntDesign style={eventStyles.deleteIcon} name="delete" size={30} color="#0A6847"
                        onLongPress={() => handleDeletePress(ev.id)}
                    />
                }
            </View>
            {expanded ? (
                <Pressable style={eventStyles.toggle} onPress={toggleExpanded} activeOpacity={1}>
                    <AntDesign style={eventStyles.toggleIcon} name="caretup" size={24} color="black" />
                </Pressable>
            ) : (
                <Pressable style={eventStyles.toggle} onPress={toggleExpanded} activeOpacity={1}>
                    <AntDesign style={eventStyles.toggleIcon} name="caretdown" size={24} color="black" />
                </Pressable>
            )}
        </>
    )
}
