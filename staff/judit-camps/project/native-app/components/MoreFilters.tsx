// @ts-nocheck
import { View, Text, Pressable, TextInput, StyleSheet, Alert, ScrollView } from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"
import { useState } from "react"
import { useFocusEffect } from "@react-navigation/native"
import logic from "../logic"
import SelectOne from "./SelectOne"
import PriceSelector from "./PriceSelector"


export default function MoreFilters({ onCancelClick, setFilters }) {
    const [city, setCity] = useState("")
    const [orgList, setOrgList] = useState([])
    const [priceValuem, setPriceValue] = useState(null)

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

    const handlePriceChosen = (value) => {
        setPriceValue(value)
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.smallContainer}>
                <Pressable style={styles.button} onPress={handleCancelClick}>
                    <Text>Cancel</Text>
                </Pressable>
                <TextInput style={styles.input} placeholder="ciutat" />

                <SelectOne categories={orgList} placeholderText="Nom de l'organització" />

                <Text>Dia</Text>
                <DateTimePicker
                    value={new Date}
                    mode="date"
                    is24Hour={true}
                    display="default"
                />

                <PriceSelector onChosen={handlePriceChosen} />

                <Pressable style={styles.button} onPress={handleApplyClick}>
                    <Text>Aplicar canvis</Text>
                </Pressable>

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        zIndex: 1,
        backgroundColor: "rgba(000, 000, 000, 0.5)",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: [{ translateY: -100 }]
    },
    smallContainer: {
        margin: 170,
        padding: 20,
        backgroundColor: "#f6e9b2",
        width: "85%",
        height: "90%",
        display: "flex",
        borderRadius: 24,
    },
    input: {
        height: 48,
        backgroundColor: "white",
        marginBottom: 20,
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
