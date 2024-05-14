// @ts-nocheck
import React, { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native"

export default function PriceSelector({ onChosen }) {
    const [selectedPrice, setSelectedPrice] = useState(null)
    const [customPrice, setCustomPrice] = useState("")

    const handlePriceSelect = (price) => {
        setSelectedPrice(price)
        if (price !== "price") {
            setCustomPrice(price)
            onChosen(price)
        }
    }

    const handleCustomPriceChange = (text) => {
        setCustomPrice(parseInt(text))
        onChosen(parseInt(text))
    }


    return (
        <View style={styles.container}>
            <Text style={styles.label}>Preu</Text>
            <TouchableOpacity
                style={[styles.optionButton, selectedPrice === 0 && styles.selectedOption]}
                onPress={() => handlePriceSelect(0)}
            >
                <Text>Gratis</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.optionButton, selectedPrice === -1 && styles.selectedOption]}
                onPress={() => handlePriceSelect(-1)}
            >
                <Text>Taquilla inversa</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.optionButton, selectedPrice === "price" && styles.selectedOption]}
                onPress={() => handlePriceSelect("price")}
            >
                <Text>... Escull preu</Text>
            </TouchableOpacity>
            {selectedPrice === "price" && (
                <TextInput
                    style={styles.input}
                    placeholder="Escriu el preu"
                    value={customPrice}
                    onChangeText={handleCustomPriceChange}
                    keyboardType="numeric"
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        marginBottom: 16
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    optionButton: {
        padding: 10,
        marginBottom: 10,
        backgroundColor: "white",
        borderRadius: 5,
    },
    selectedOption: {
        backgroundColor: "#A3E1A1",
    },
    input: {
        height: 48,
        backgroundColor: "white",
        marginBottom: 20,
        padding: 10,
        borderRadius: 8,
    },
})


