// @ts-nocheck
import React, { useState } from "react"
import { Text, View, StyleSheet } from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"

export default function TimePicker({ selectedTime, onTimeChange }) {
    const [time, setTime] = useState(selectedTime)

    const handleTimeChange = (event, selectedTime) => {
        const currentTime = selectedTime || time
        setTime(currentTime)
        onTimeChange(currentTime)
    }

    return (
        <View>
            <Text style={styles.label}>Hora</Text>
            <View style={styles.modalContainer}>
                <View style={styles.pickerContainer}>
                    <DateTimePicker
                        value={time}
                        mode="time"
                        is24Hour={true}
                        display="default"
                        onChange={handleTimeChange}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "flex-start",
    },
    pickerContainer: {
        justifyContent: "center"
    }
})