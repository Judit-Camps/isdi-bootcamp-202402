// @ts-nocheck
import React, { useState } from "react"
import { ScrollView, Text, TextInput, Button, StyleSheet, Alert } from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"
import Picker from "@react-native-picker/picker"
import logic from "../logic"
import format from "date-fns"

import { useContext } from "../context"

export default function CreateEventForm({ onEventCreated }) {
    const { user, setStamp } = useContext()
    const [title, setTitle] = useState("")
    const [city, setCity] = useState("")
    const [address, setAddress] = useState("")
    const [description, setDescription] = useState("")
    const [time, setTime] = useState(new Date())
    const [price, setPrice] = useState("")
    const [date, setDate] = useState(new Date())
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [showTimePicker, setShowTimePicker] = useState(false)

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
            logic.createEvent(title, eventCity, eventAddress, description, date.toLocaleTimeString(), 0, date.toLocaleDateString("en-CA").split(',')[0].trim())
                .then(() => {
                    setStamp(Date.now())
                    setTitle("")
                    setCity("")
                    setAddress("")
                    setDescription("")
                    setTime(new Date())
                    setDate(new Date())
                    Alert.alert("Event creat")

                    onEventCreated()

                })
                .catch(error => console.error(error))

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <ScrollView style={styles.container}>
            <Text>Nom de l'activitat</Text>
            <TextInput
                style={styles.input}
                placeholder="Nom de l'activitat"
                value={title}
                onChangeText={setTitle}
            />
            <Text>Poble/Ciutat</Text>
            <TextInput
                style={styles.input}
                defaultValue={user.city}
                placeholder={user.city}
                value={city}
                onChangeText={setCity}
            />
            <Text>Adreça</Text>
            <TextInput
                style={styles.input}
                defaultValue={user.address}
                placeholder={user.address}
                value={address}
                onChangeText={setAddress}
            />
            <Text>Descripció</Text>
            <TextInput
                style={styles.inputArea}
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

            <Text>Price</Text>
            {/* <Picker
                selectedValue={price}
                onValueChange={(itemValue, itemIndex) => setPrice(itemValue)}
            >
                <Picker.Item label="Free" value="0" />
                <Picker.Item label="Pay What You Want" value="-1" />
                <Picker.Item label="Price" value="price" />
            </Picker> */}
            <Button title="Submit" onPress={handleSubmit} style={styles.button} />
        </ScrollView>
    )
}

// const styles = StyleSheet.create({
//     container: {
//         paddingRight: 12,
//         paddingTop: 10,
//         marginTop: 20,
//         marginBottom: 40,
//         height: "80%",
//         paddingBottom: 75
//     },
//     text: {
//         fontSize: 24,
//         fontWeight: "bold",

//     },
//     input: {
//         width: "90%",
//         height: 48,
//         borderColor: "gray",
//         borderWidth: 1,
//         margin: 16,
//         padding: 8,
//         borderRadius: 16,
//         fontSize: 16
//     },
//     inputArea: {
//         width: '90%',
//         height: 90,
//         borderColor: 'gray',
//         borderWidth: 1,
//         margin: 16,
//         padding: 8,
//         borderRadius: 16,
//         fontSize: 16
//     },
//     button: {
//         margin: 30
//     }
// })

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 10,
        marginTop: 20,
        marginBottom: 40,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    input: {
        height: 48,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
        borderRadius: 8,
    },
    inputArea: {
        height: 90,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
        borderRadius: 8,
    },
});