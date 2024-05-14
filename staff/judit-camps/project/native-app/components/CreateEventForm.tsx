// @ts-nocheck
import React, { useState } from "react"
import { ScrollView, Text, TextInput, Button, StyleSheet, Alert, KeyboardAvoidingView, View, Pressable } from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"
import { MultipleSelectList } from "react-native-dropdown-select-list"
import Picker from "@react-native-picker/picker"
import logic from "../logic"
import format from "date-fns"
import Selection from "./Selection"
import PriceSelector from "./PriceSelector"

import { useContext } from "../context"

export default function CreateEventForm({ onEventCreated }) {
    const { user, setStamp } = useContext()
    const [title, setTitle] = useState("")
    const [city, setCity] = useState("")
    const [address, setAddress] = useState("")
    const [description, setDescription] = useState("")
    const [time, setTime] = useState(new Date())
    const [date, setDate] = useState(new Date())
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [showTimePicker, setShowTimePicker] = useState(false)
    const [priceValue, setPriceValue] = useState(null)

    const categories = ["Música", "Art", "Concerts", "Esport", "Política", "Feminisme", "Infantil", "Llibres", "Tallers", "Xerrades"].sort()

    const [selectedCategories, setSelectedCategories] = useState([])

    const handleSelectedCategories = (selected) => {
        setSelectedCategories(selected)
        console.log("Selected category: ", selected)
    }

    console.log(priceValue)

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

    const handlePriceChosen = (value) => {
        console.log(typeof value)
        setPriceValue(value)
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
            logic.createEvent(title, eventCity, eventAddress, description, date.toLocaleTimeString(), priceValue, date.toLocaleDateString("en-CA").split(',')[0].trim(), selectedCategories)
                .then(() => {
                    setStamp(Date.now())
                    setTitle("")
                    setCity("")
                    setAddress("")
                    setDescription("")
                    setTime(new Date())
                    setDate(new Date())
                    setSelectedCategories([])
                    setPriceValue(0)
                    Alert.alert("Esdeveniment creat")

                    onEventCreated()

                })
                .catch(error => console.error(error))

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <KeyboardAvoidingView>
            <View>
                <ScrollView style={styles.container}>
                    <Text style={styles.label}>Nom de l'activitat</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nom de l'activitat"
                        value={title}
                        onChangeText={setTitle}
                    />
                    <Text style={styles.label}>Poble/Ciutat</Text>
                    <TextInput
                        style={styles.input}
                        defaultValue={user.city}
                        placeholder={user.city}
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
                        multiline={true}
                        value={description}
                        onChangeText={setDescription}
                    />

                    <Text style={styles.label}>Dia</Text>
                    <DateTimePicker
                        value={date}
                        mode="date"
                        is24Hour={true}
                        display="default"
                        onChange={handleDateChange}
                    />

                    <Text style={styles.label}>Hora</Text>
                    <DateTimePicker
                        value={date}
                        mode="time"
                        is24Hour={true}
                        display="default"
                        onChange={handleTimeChange}
                    />

                    <Text style={styles.label}>Categories</Text>
                    <Selection categories={categories} placeholderText="Escriu i tria: Art, Tallers..." selectedCategories={handleSelectedCategories}  >

                    </Selection>

                    <PriceSelector onChosen={handlePriceChosen} />

                    <Pressable style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Crea l'esdeveniment</Text>
                    </Pressable>
                </ScrollView>

            </View>

        </KeyboardAvoidingView>
    )
}


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 10,
        marginTop: 20,
        marginBottom: 80,
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