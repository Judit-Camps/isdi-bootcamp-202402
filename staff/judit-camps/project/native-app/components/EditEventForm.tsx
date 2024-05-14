// @ts-nocheck
import React, { useState } from "react"
import { ScrollView, Text, TextInput, Button, StyleSheet, Alert, View, Pressable } from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"
import { MultipleSelectList } from "react-native-dropdown-select-list"
import logic from "../logic"

import { useContext } from "../context"
import PriceSelector from "./PriceSelector"
import Selection from "./Selection"

export default function EditEventForm({ onEventModified, onCancelClick, ev }) {
    const { user, setStamp } = useContext()
    const [title, setTitle] = useState(ev.title)
    const [city, setCity] = useState("")
    const [address, setAddress] = useState("")
    const [description, setDescription] = useState(ev.description)
    const [time, setTime] = useState(new Date())
    const [price, setPrice] = useState("")
    const [date, setDate] = useState(new Date(ev.date))
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [showTimePicker, setShowTimePicker] = useState(false)
    const [priceValue, setPriceValue] = useState(ev.price)

    const categories = ["Música", "Art", "Concerts", "Esport", "Política", "Feminisme", "Infantil", "Llibres", "Tallers", "Xerrades"].sort()

    const [selectedCategories, setSelectedCategories] = useState(ev.categories)
    console.log("Selected category: ", selectedCategories)

    const handlePriceChosen = (value) => {
        console.log(typeof value)
        setPriceValue(value)
    }
    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date
        setShowDatePicker(false)
        setDate(currentDate)
    }

    const handleTimeChange = (event, selectedTime) => {
        const currentTime = selectedTime || new Date()
        setShowTimePicker(false)
        setTime(currentTime.toLocaleTimeString())
    }

    const handleCancelClick = () => {
        onCancelClick()
    }

    const handleSelectedCategories = (selected) => {
        setSelectedCategories(selected)
        console.log("Selected category: ", selected)
    }

    const handleCategoriesOnRemove = (selected) => {
        setSelectedCategories(selected)
        console.log("Selected category: ", selected)
    }

    const handleSubmit = () => {
        console.log("Form submitted")

        let eventCity
        if (!city) {
            eventCity = user.city
        } else eventCity = city

        let eventAddress
        if (!address) {
            eventAddress = user.address
        } else eventAddress = address


        try {
            console.log("---", selectedCategories)
            logic.modifyEvent(ev.id, title, eventCity, eventAddress, description, ev.time, priceValue, date.toLocaleDateString("en-CA").split(',')[0].trim(), selectedCategories)
                .then(() => {
                    setStamp(Date.now())
                    setTitle("")
                    setCity("")
                    setAddress("")
                    setDescription("")
                    setTime(new Date())
                    setDate(new Date())
                    Alert.alert("Esdeveniment editat")

                    onEventModified()

                })
                .catch(error => console.error(error))

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <View style={styles.container}>

            <ScrollView style={styles.smallContainer}>
                <Text style={styles.label}>Categories</Text>
                <Selection chosenCategories={selectedCategories} selectedCategories={handleSelectedCategories} placeholderText="Escriu i tria..." removedCategories={handleCategoriesOnRemove} />

                <Text style={styles.label}>Nom de l'activitat</Text>
                <TextInput
                    style={styles.input}
                    defaultValue={ev.title}
                    placeholder={ev.title}
                    value={title}
                    onChangeText={setTitle}
                />
                <Text style={styles.label}>Poble/Ciutat</Text>
                <TextInput
                    style={styles.input}
                    defaultValue={ev.city}
                    placeholder={ev.city}
                    value={city}
                    onChangeText={setCity}
                />
                <Text style={styles.label}>Adreça</Text>
                <TextInput
                    style={styles.input}
                    defaultValue={user.address}
                    placeholder={user.address}
                    value={address}
                    onChangeText={setAddress}
                />
                <Text style={styles.label}>Descripció</Text>
                <TextInput
                    style={styles.inputArea}
                    defaultValue={ev.description}
                    placeholder={ev.description}
                    multiline={true}
                    value={description}
                    onChangeText={setDescription}
                />

                <Text>Dia</Text>
                <DateTimePicker
                    value={date}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={handleDateChange}
                />

                <Text>Hora</Text>
                <DateTimePicker
                    value={date}
                    mode="time"
                    is24Hour={true}
                    display="default"
                    onChange={handleTimeChange}
                />

                <PriceSelector onChosen={handlePriceChosen} />

                <Pressable onPress={handleSubmit} style={styles.button} >
                    <Text style={styles.buttonText}>Editar</Text>
                </Pressable>

                <Pressable onPress={handleCancelClick} style={[styles.button, { marginBottom: 36 }]}>
                    <Text style={styles.buttonText}>Cancel</Text>
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
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    input: {
        height: 48,
        backgroundColor: "white",
        marginBottom: 20,
        padding: 10,
        borderRadius: 8,
    },
    inputArea: {
        height: 90,
        marginBottom: 20,
        padding: 10,
        borderRadius: 8,
        backgroundColor: "white",
    },
    button: {
        height: 48,
        backgroundColor: "#f3ca52",
        borderRadius: 24,
        marginBottom: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#0A6847",
    },
});