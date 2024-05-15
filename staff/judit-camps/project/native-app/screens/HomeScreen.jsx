import { View, Text, StyleSheet, Button, ScrollView, TextInput, Pressable, Alert } from "react-native";
import { useState, useEffect } from "react";
import logic from "../logic";
import { useContext } from "../context";
import EventList from "../components/EventList";
import FilterDiv from "../components/FilterDiv";
import { FontAwesome } from "@expo/vector-icons";
import EditEventForm from "../components/EditEventForm";
import MoreFilters from "../components/MoreFilters";

export default function HomeScreen({ navigation }) {
    const [events, setEvents] = useState(null)

    const { user, stamp, setStamp } = useContext()

    const [allFilters, setAllFilters] = useState({
        organization: {
            id: null,
            name: null
        },
        location: null,
        price: null,
        categories: []
    })

    console.log("--ll", allFilters)

    const loadEvents = () => {

        const transformedFilters = {
            ...allFilters,
            organization: allFilters.organization ? allFilters.organization.id : null
        }
        try {
            logic.findEvents(transformedFilters)
                .then(events => {
                    setEvents(events)
                })
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        loadEvents()
    }, [stamp, allFilters])

    const [ev, setEvent] = useState(null)

    const [view, setView] = useState(null)

    const clearView = () => setView(null)

    const handleOnEventAuthorClicked = (author) => {
        navigation.navigate("OrganizationProfile", { author })
    }

    const handleEditEvent = ev => {
        setEvent(ev)
        setView("edit-event")
    }

    const handleEditEventCancelClick = () => {
        clearView()
    }

    const handleEventEdited = () => {
        clearView()
        setStamp(Date.now())
        setEvent(null)
    }

    const handleFilters = (filter) => {
        if (filter === "+ Filtres") {
            setView("more-filters")
        } else {
            console.log(filter)

            const updatedFilters = [...allFilters.categories, filter]
            setAllFilters({ ...allFilters, categories: updatedFilters })
        }
    }

    const handleRemoveFilter = (filter) => {
        console.log("remove - ", filter)

        const removed = allFilters.categories.filter(category => category !== filter)
        setAllFilters({ ...allFilters, categories: removed })
    }

    const handleMoreFiltersCancel = () => {
        clearView()
    }

    const handleSubmitFilters = (filters) => {
        clearView()
        console.log("aaaa", filters)
        const mergedFilters = { ...allFilters, ...filters }
        setAllFilters(mergedFilters)
    }

    const handleFiltersRemoved = () => {
        clearView()
        setAllFilters({
            organization: {
                id: null,
                name: null
            },
            location: null,
            price: null,
            categories: allFilters.categories
        })
    }

    return (
        <View style={styles.main}>
            <View style={styles.header} >

                <View>
                    {user ? <Text style={styles.headerText} >Hola {user.name}!</Text> : <Text style={styles.headerText} >Hola!</Text>}

                    {!user && (
                        <>
                            < Button style={styles.headerButton} title="Entrar" onPress={() => navigation.navigate("Login")} />
                            <Text>Entra i guarda't el que t'agrada</Text>
                        </>
                    )}

                </View>


                <View style={{ display: "flex", flexDirection: "row" }}>

                    <TextInput style={styles.input} placeholder="Buscar" />

                    <Pressable style={styles.button} onPress={() => Alert.alert("search")}>
                        <FontAwesome name="search" size={12} />
                    </Pressable>
                </View>
            </View>

            <FilterDiv onAddFilter={handleFilters} onRemoveFilter={handleRemoveFilter} />

            {view === "more-filters" && <MoreFilters onCancelClick={handleMoreFiltersCancel} onSubmitFilters={handleSubmitFilters} onFiltersRemoved={handleFiltersRemoved} chosenFilters={allFilters} />}

            <ScrollView style={{ marginBottom: 180 }}>
                <EventList events={events} onEventAuthorClick={handleOnEventAuthorClicked} onEditEventClick={handleEditEvent} textOnEmptyList={"Encara no hi ha esdeveniments"} />

            </ScrollView>

            {view === "edit-event" && <EditEventForm ev={ev} onCancelClick={handleEditEventCancelClick} onEventModified={handleEventEdited} />}


        </View >
    )
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: "#E4F1E4",
        marginBottom: 120
    },
    header: {
        alignItems: 'center',
        justifyContent: 'space-between',
        top: 0,
        display: 'flex',
        flexDirection: 'column',
        padding: 12,
        backgroundColor: '#7aba78'
    },
    headerText: {
        marginTop: 40,
        fontSize: 24,
        fontWeight: 'bold',
        paddingBottom: 16
    },
    headerButton: {
        marginTop: 90,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    input: {
        width: "70%",
        height: 36,
        borderRadius: 24,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        paddingHorizontal: 20,
        marginBottom: 20,
        backgroundColor: "#ffffff",
    },
    button: {
        backgroundColor: "#E4F1E4",
        padding: 12,
        maxHeight: 36,
        alignContent: "center",
        borderTopRightRadius: 24,
        borderBottomEndRadius: 24
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