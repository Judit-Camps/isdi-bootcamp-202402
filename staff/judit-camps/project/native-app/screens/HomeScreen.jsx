import { View, Text, StyleSheet, Button, ScrollView, TextInput, Pressable, Alert } from "react-native";
import { useState, useEffect } from "react";
import logic from "../logic";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "../context";
import CreateEventForm from "../components/CreateEventForm"
import EventList from "../components/EventList";
import FilterDiv from "../components/FilterDiv";
import { FontAwesome } from "@expo/vector-icons";

export default function HomeScreen({ navigation }) {
    const { user, setUser, stamp, setRole } = useContext()

    useEffect(() => {
        try {

        } catch (error) {
            console.error("------", error)
        }

    }, [])

    const handleOnEventAuthorClicked = (author) => {
        navigation.navigate("OrganizationProfile", { author })
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

            <ScrollView style={{ marginBottom: 90, backgroundColor: "#E4F1E4" }}>
                <FilterDiv />
                <EventList stamp={stamp} onEventAuthorClick={handleOnEventAuthorClicked} />
            </ScrollView>

        </View >
    )
}

const styles = StyleSheet.create({
    // main: {
    //     backgroundColor: "#E4F1E4"
    // },
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