import { View, ScrollView, Text, StyleSheet, Button, Pressable, Alert } from "react-native";
import logic from "../logic";
import { useContext } from "../context"
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { useEffect } from "react";
import EventList from "../components/EventList";
import { useState } from "react";
import EditEventForm from "../components/EditEventForm";

export default function UserScreen({ navigation }) {
    const { user, setUser, role, setRole, stamp, setStamp } = useContext()

    const [eventEdit, setEventEdit] = useState(null)
    const [view, setView] = useState(null)
    const [userId, setUserId] = useState(null)
    const [events, setEvents] = useState(null)

    const clearView = () => setView(null)

    const loadEvents = () => {
        if (user)
            if (role === "regular")
                try {
                    logic.retrieveSavedEvents()
                        .then(events => {
                            setEvents(events)
                        })
                        .catch(error => console.error(error))
                } catch (error) {
                    console.error(error)
                }
            else if (role === "organization")
                try {
                    logic.findEvents({ organization: userId })
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

    const [selectedFilters, setFilters] = useState({
        organization: null,
        location: null,
        price: null,
        categories: []
    })

    const handleLogOutClick = () => {
        try {
            logic.logOutUser()
            setUser(null)
            setRole(null)
            setUserId(null)
            navigation.navigate("Home")

        } catch (error) {
            console.error(error)
        }
    }

    const handleEditEvent = (ev) => {
        setEventEdit(ev)
        setView("edit-event")
    }

    const handleEditEventCancelClick = () => {
        clearView()
    }

    const handleEventEdited = () => {
        clearView()
        setStamp(Date.now())
        setEventEdit(null)
    }

    useEffect(() => {
        try {
            if (user !== null) {
                logic.getLoggedInUserId()
                    .then(userId => {
                        setUserId(userId)
                        setFilters(prevFilters => ({ ...prevFilters, organization: userId }))
                        setStamp(Date.now())
                    })
                    .catch(error => console.error(error));

            }
        } catch (error) {
            console.error(error);
        }
    }, [user]);


    return (
        <View style={styles.main}>
            {user !== null ? (
                <View>
                    <View >
                        <View style={styles.header} >
                            <View style={{ display: "flex", flexDirection: "column" }}>
                                <Text style={styles.title} >{user.name}</Text>
                                <Text style={styles.title} >{user.username}</Text>
                            </View>

                            <View>
                                <Pressable style={styles.button} onPress={handleLogOutClick}>
                                    <Text style={styles.buttonText}>Tancar sessió</Text>
                                </Pressable>

                                <Pressable style={styles.button} onPress={() => Alert.alert("Function yet to come")}>
                                    <Text style={styles.buttonText}>Editar perfil</Text>
                                </Pressable>

                            </View>
                        </View>

                    </View>

                    {role === "regular" ? (
                        <View>
                            <Text>Esdeveniments guardats</Text>

                            <ScrollView style={{ marginBottom: 240 }}>
                                <EventList events={events} onEmptyText={"No tens cap esdeveniment guardat"} />
                            </ScrollView>
                        </View>
                    ) : (

                        <View>
                            <Text>Esdeveniments creats</Text>
                            <ScrollView style={{ marginBottom: 240 }}>
                                <EventList events={events} onEditEventClick={handleEditEvent} textOnEmptyList={"Encara no has creat cap esdeveniment"} />
                            </ScrollView>
                        </View>
                    )}
                </View>

            ) : (
                <View style={{ marginTop: 100, padding: 16, justifyContent: "center", alignItems: "center" }}>
                    <Text style={styles.text} >Inicia sessió per poder veure les teves activitats guardades!</Text>
                    <Pressable style={styles.bigButton} onPress={() => navigation.navigate("Login")}>
                        <Text style={styles.buttonText}>
                            Iniciar sessió
                        </Text>
                    </Pressable>

                    <Text style={styles.text}>Encara no tens un compte?</Text>

                    <Pressable style={styles.bigButton} onPress={() => navigation.navigate("RegisterReg")}>
                        <Text style={styles.buttonText}>
                            Registrar-se
                        </Text>
                    </Pressable>

                    <Text style={styles.text}>Sou una organització o associació i voleu ensenyar tot el que feu?</Text>
                    <Pressable style={styles.bigButton} onPress={() => navigation.navigate("RegisterOrg")}>
                        <Text style={styles.buttonText}>
                            Registrar-se com a organització
                        </Text>
                    </Pressable>

                </View>
            )
            }


            {view === "edit-event" && <EditEventForm ev={eventEdit} onCancelClick={handleEditEventCancelClick} onEventModified={handleEventEdited} />}
        </View>
    )
}


const styles = StyleSheet.create({
    main: {
        backgroundColor: "#E4F1E4",
        height: "100%"
    },
    header: {
        display: "flex",
        padding: "90",
    },
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
        backgroundColor: "#F6E9B2"
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        margin: 16,
        color: "#0A6847",
    },
    input: {
        width: "100%",
        height: 48,
        borderRadius: 24,
        paddingHorizontal: 20,
        marginBottom: 20,
        backgroundColor: "#ffffff",
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
    bigButton: {
        width: "50%",
        height: 48,
        backgroundColor: "#7ABA78",
        borderRadius: 24,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },

    buttonText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#ffffff",
        textAlign: "center",
        padding: 6
    },
})