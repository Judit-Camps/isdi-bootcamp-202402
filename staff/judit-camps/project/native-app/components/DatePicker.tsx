// @ts-nocheck
import { useState } from "react"
import { Text, StyleSheet, View } from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"

export default function DatePicker({ date, onDateChange }) {

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date
        onDateChange(currentDate)
    }

    return (
        <View>
            <Text style={styles.label}>Data</Text>

            <DateTimePicker
                value={date}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={handleDateChange}
            />
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