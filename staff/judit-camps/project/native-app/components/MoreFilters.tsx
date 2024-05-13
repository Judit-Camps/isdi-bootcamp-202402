// @ts-nocheck
import { View, Text, Pressable, TextInput, StyleSheet, Alert } from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"
import { useEffect, useState } from "react"
import { useFocusEffect } from "@react-navigation/native"
import logic from "../logic"
import SelectOne from "./SelectOne"


export default function MoreFilters({ onCancelClick, setFilters }) {
    const [city, setCity] = useState("")
    const [orgList, setOrgList] = useState([])

    useFocusEffect(() => {
        try {
            logic.retrieveOrgs()
                .then(orgs => setOrgList(orgs))
        } catch (error) {

        }
    })

    const handleApplyClick = () => {
        console.log("Aplica canvis")

        Alert.alert("functionality to come")
    }

    const handleCancelClick = () => {
        onCancelClick()
    }

    return (
        <View style={styles.container}>

            <View style={styles.smallContainer}>
                <TextInput style={styles.input} placeholder="ciutat" />

                <SelectOne categories={orgList} placeholderText="Nom de l'organització" />

                <Text>Dia</Text>
                <DateTimePicker
                    value={new Date}
                    mode="date"
                    is24Hour={true}
                    display="default"
                />


                <Pressable style={styles.button} onPress={handleCancelClick}>
                    <Text>Cancel</Text>
                </Pressable>


                <Pressable style={styles.button} onPress={handleApplyClick}>
                    <Text>Aplicar canvis</Text>
                </Pressable>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        zIndex: 1,
        backgroundColor: "rgba(243, 202, 82, 0.2)",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: [{ translateY: -120 }]
    },
    smallContainer: {
        backgroundColor: "white",
        width: "85%",
        height: "60%",
        display: "flex",
        borderRadius: 24
    },
    input: {
        height: 48,
        borderColor: "gray",
        borderWidth: 1,
        margin: 20,
        padding: 10,
        borderRadius: 8,
    },
    button: {
        width: "80%",
        height: 48,
        backgroundColor: "#7ABA78",
        borderRadius: 24,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
})
