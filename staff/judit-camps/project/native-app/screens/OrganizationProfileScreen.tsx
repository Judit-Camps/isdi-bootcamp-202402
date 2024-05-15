// @ts-nocheck
import { View, Text, StyleSheet, Pressable, ScrollView, Alert } from "react-native"
import { useRoute } from "@react-navigation/native"
import { useEffect, useState } from "react"
import logic from "../logic"
import EventList from "../components/EventList"
import { useContext } from "../context"
import { AntDesign } from "@expo/vector-icons"

export default function OrganizationProfileScreen({ navigation }) {

    const { stamp } = useContext()
    const [events, setEvents] = useState(null)

    const route = useRoute()
    const { author } = route.params

    const loadEvents = () => {
        try {
            logic.findEvents({ organization: author.id })
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
        <View style={styles.main}>
            <View style={styles.header}>
                < Pressable style={styles.headerButton} onPress={() => navigation.navigate("Home")}>
                    <AntDesign name="arrowleft" size={24} color="black" />
                </Pressable>
                <View style={styles.infoSection} >
                    <Text style={styles.headerText}>{author.name}</Text>

                    <View style={styles.linksSection}>
                        <AntDesign style={styles.iconLink} name="instagram" size={26} color="black" onPress={() => Alert.alert("functionality to come")} />
                        <AntDesign style={styles.iconLink} name="twitter" size={26} color="black" onPress={() => Alert.alert("functionality to come")} />
                        <AntDesign style={styles.iconLink} name="mail" size={26} color="black" onPress={() => Alert.alert("functionality to come")} />
                    </View>
                </View>

            </View>
            <ScrollView>
                <EventList events={events} />
            </ScrollView>

        </View >
    )
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: "#E4F1E4",
        marginBottom: 0,
        height: "100%"
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 12,
        backgroundColor: "#7aba78",
        height: 136
    },
    headerText: {
        marginTop: 48,
        fontSize: 24,
        fontWeight: "bold",
        paddingBottom: 8
    },
    headerButton: {
        marginTop: 28,
        padding: 12
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
    },
    infoSection: {
        alignItems: "flex-end",
        marginRight: 20,
    },
    linksSection: {
        display: "flex",
        flexDirection: "row",

        padding: 8,
    },
    iconLink: {
        paddingRight: 8
    },

    h1: {
        fontSize: 160,
        marginBottom: 30
    },
    act: {
        backgroundColor: "#a99f00",
        borderRadius: 12,
        margin: 12,
        height: 120,
        padding: 12
    }
})

