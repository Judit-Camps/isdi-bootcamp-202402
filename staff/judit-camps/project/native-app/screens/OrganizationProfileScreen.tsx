// @ts-nocheck
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import EventListOrg from "../components/EventListOrg";
import { useEffect, useState } from "react";
import logic from "../logic";
import EventList from "../components/EventList";
import { useContext } from "../context";

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
        <View>
            <View style={styles.header}>
                < Button style={styles.headerButton} title="<" onPress={() => navigation.navigate("Home")} />
                <View >
                    <Text style={styles.headerText}>{author.name}</Text>
                </View>

            </View>
            <ScrollView>
                <EventList events={events} />
            </ScrollView>

        </View >
    )
}

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        justifyContent: 'space-between',
        top: 0,
        display: 'flex',
        flexDirection: 'row',
        padding: 12,
        backgroundColor: '#fff086'
    },
    headerText: {
        marginTop: 40,
        fontSize: 24,
        fontWeight: 'bold',
    },
    headerButton: {
        marginTop: 90,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    button: {

    },
    h1: {
        fontSize: 160,
        marginBottom: 30
    },
    act: {
        backgroundColor: '#a99f00',
        borderRadius: 12,
        margin: 12,
        height: 120,
        padding: 12
    }
})