// @ts-nocheck
import { View, Text, Pressable, TextInput, StyleSheet, Alert, ScrollView } from "react-native"
import { useState } from "react"
import { useFocusEffect } from "@react-navigation/native"
import logic from "../logic"
import SelectOne from "./SelectOne"
import PriceSelector from "./PriceSelector"
import DatePicker from "./DatePicker"
import { AntDesign } from '@expo/vector-icons'


export default function MoreFilters({ onCancelClick, onSubmitFilters, onFiltersRemoved, chosenFilters }) {

    const { organization, location, price, date } = chosenFilters

    const [city, setCity] = useState(location ? location : "")
    const [orgList, setOrgList] = useState([])
    const [priceValue, setPriceValue] = useState(price ? price : null)
    const [selectedOrg, setSelectedOrg] = useState(organization ? organization : null)
    const [chosenDate, setDate] = useState(date ? new Date(date) : new Date())
    const [showDatePicker, setShowDatePicker] = useState(date ? true : false)

    useFocusEffect(() => {
        try {
            logic.retrieveOrgs()
                .then(orgs => setOrgList(orgs))
        } catch (error) {

        }
    })

    const handleApplyClick = () => {

        const filters = {
            organization: {
                id: selectedOrg.id,
                name: selectedOrg.name
            },
            location: city,
            price: priceValue,
            date: showDatePicker ? chosenDate.toLocaleDateString("en-CA").split(',')[0].trim() : null
        }

        onSubmitFilters(filters)

        Alert.alert("Filtres aplicats")
    }

    const handleCancelClick = () => {
        onCancelClick()
    }

    const handlePriceChosen = (value) => {
        setPriceValue(value)
    }

    const handleOrgChosen = (org) => {
        setSelectedOrg(org)
    }

    const handleRemoveFilters = () => {
        setCity("")
        setPriceValue(null)
        setSelectedOrg({
            id: null,
            name: null
        })

        onFiltersRemoved()
    }

    const handlePressDateButton = () => {
        setShowDatePicker(true)
    }

    const handleCancelDate = () => {
        setShowDatePicker(false)
        setDate(new Date())
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.smallContainer}>
                <Text style={styles.label}>Ciutat/Poble</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ciutat/Poble"
                    value={city}
                    onChangeText={setCity} />

                <Text style={styles.label}>Organització</Text>
                <SelectOne items={orgList} placeholderText="Nom de l'organització" valueChosen={handleOrgChosen} chosenOrg={selectedOrg} />


                {showDatePicker ? (
                    <>
                        <Pressable onPress={handleCancelDate}>
                            <Text style={styles.buttonText}> <AntDesign name="caretup" size={12} color="black" />Seleccionar Data</Text>
                        </Pressable>
                        <DatePicker date={chosenDate} onDateChange={setDate} />
                    </>
                ) : (

                    <Pressable onPress={handlePressDateButton}>
                        <Text style={styles.buttonText}> <AntDesign name="caretdown" size={12} color="black" />Seleccionar Data</Text>
                    </Pressable>
                )}

                <PriceSelector onChosen={handlePriceChosen} previousPrice={priceValue} />

                <View style={{ alignItems: "center" }}>

                    <Pressable style={styles.button} onPress={handleApplyClick}>
                        <Text style={styles.buttonText}>Aplicar filtres</Text>
                    </Pressable>


                    <Pressable style={styles.button} onPress={handleRemoveFilters}>
                        <Text style={styles.buttonText}>Borrar filtres</Text>
                    </Pressable>

                    <Pressable style={styles.button} onPress={handleCancelClick}>
                        <Text style={styles.buttonText}>Cancel·lar</Text>
                    </Pressable>
                </View>
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
        transform: [{ translateY: -120 }],
        marginBottom: 0,
        height: "100%"
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    smallContainer: {
        margin: 180,
        padding: 20,
        backgroundColor: "#f6e9b2",
        width: "85%",
        height: "80%",
        display: "flex",
        borderRadius: 24,
        marginBottom: 120
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
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "black"
    },
})
