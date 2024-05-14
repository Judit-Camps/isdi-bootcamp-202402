// @ts-nocheck
import React, { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native"

export default function PriceSelector({ onChosen, previousPrice }) {
    const [selectedPrice, setSelectedPrice] = useState(previousPrice ? previousPrice : null)
    const [customPrice, setCustomPrice] = useState((previousPrice && previousPrice > 0) ? previousPrice : "")

    // const handlePriceSelect = (price) => {
    //     setSelectedPrice(price)
    //     if (price !== "price") {
    //         setCustomPrice(price)
    //         onChosen(price)
    //     }
    // }

    // const handleCustomPriceChange = (text) => {
    //     setCustomPrice(parseInt(text))
    //     onChosen(parseInt(text))
    // }

    const handlePriceSelect = (price) => {
        setSelectedPrice(price === selectedPrice ? null : price); // Toggle selection
        if (price !== "price") {
            setCustomPrice(price);
            onChosen(price);
        }
    };

    const handleCustomPriceChange = (text) => {
        const price = parseInt(text);
        setCustomPrice(price);
        onChosen(price !== 0 ? price : null); // If price is 0, treat it as unselected
        if (price === 0) setSelectedPrice(null); // Unselect the custom price if it's 0
    };

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
                <Text>... Escull el preu</Text>
            </TouchableOpacity>
            {selectedPrice === "price" && (
                <TextInput
                    style={styles.input}
                    placeholder="Preu màxim"
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


