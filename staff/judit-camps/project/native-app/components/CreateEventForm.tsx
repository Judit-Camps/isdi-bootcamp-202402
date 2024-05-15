// @ts-nocheck
import React, { useState } from "react"
import { ScrollView, Text, TextInput, StyleSheet, Alert, View, Pressable } from "react-native"
import logic from "../logic"
import Selection from "./Selection"
import PriceSelector from "./PriceSelector"
import TimePicker from "./TimePicker"

import { useContext } from "../context"
import DatePicker from "./DatePicker"

export default function CreateEventForm({ onEventCreated }) {
    const { user, setStamp } = useContext()
    const [title, setTitle] = useState("")
    const [city, setCity] = useState("")
    const [address, setAddress] = useState("")
    const [description, setDescription] = useState("")
    const [time, setTime] = useState(new Date())
    const [date, setDate] = useState(new Date())
    const [priceValue, setPriceValue] = useState(null)

    const categories = ["Música", "Art", "Concerts", "Esport", "Política", "Feminisme", "Infantil", "Llibres", "Tallers", "Xerrades"].sort()

    const [selectedCategories, setSelectedCategories] = useState([])

    const handleSelectedCategories = (selected) => {
        setSelectedCategories(selected)
    }

    const handlePriceChosen = (value) => {
        setPriceValue(value)
    }

    const handleSubmit = () => {

        let eventCity
        if (!city) {
            eventCity = user.city
        } else eventCity = city

        let eventAddress
        if (!address) {
            eventAddress = user.address
        } else eventAddress = address

        try {
            logic.createEvent(title, eventCity, eventAddress, description, time.toLocaleTimeString(), priceValue, date.toLocaleDateString("en-CA").split(',')[0].trim(), selectedCategories)
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

            <DatePicker date={date} onDateChange={setDate} />

            <TimePicker selectedTime={time} onTimeChange={setTime} />

            <Text style={styles.label}>Categories</Text>
            <Selection categories={categories} placeholderText="Escriu i tria: Art, Tallers..." selectedCategories={handleSelectedCategories}  >

            </Selection>

            <PriceSelector onChosen={handlePriceChosen} />

            <Pressable style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Crea l'esdeveniment</Text>
            </Pressable>
        </ScrollView>

    )
}


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingVertical: 20,
        paddingHorizontal: 20,
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
})