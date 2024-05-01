import { View, Text, StyleSheet, Button, ScrollView, Alert } from "react-native";
import { useState, useEffect } from "react";
import logic from "../logic";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "../context";
import CreateEventForm from "../components/CreateEventForm"
import EventList from "../components/EventList";

export default function HomeScreen({ navigation }) {
    const { user, setUser, stamp, setRole } = useContext()

    const token = AsyncStorage.getItem('token')

    useEffect(() => {
        try {

            logic.retrieveUser()
                .then(userInfo => {
                    // console.log(userInfo)
                    setUser(userInfo)
                })
                .catch(error => console.error("->>", error))
            logic.getUserRole()
                .then(role => {
                    setRole(role)
                })
                .catch(error => console.error("-->>", error))

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

                {user ? <Text style={styles.headerText} >Hola {user.name}!</Text> : <Text style={styles.headerText} >Hola!</Text>}

                {!user && (
                    <>
                        < Button style={styles.headerButton} title="Entrar" onPress={() => navigation.navigate("Login")} />
                        <Text>Entra i guarda't el que t'agrada</Text>
                    </>
                )}
            </View>
            <ScrollView style={{ marginBottom: 200 }}>
                <EventList stamp={stamp} onEventAuthorClick={handleOnEventAuthorClicked} />
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