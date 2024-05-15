// @ts-nocheck
import React, { useState } from "react"
import { View, TextInput, FlatList, Text, Pressable, StyleSheet } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"

export default function Selection({ placeholderText, selectedCategories, previousCategories }) {
    const [inputValue, setInputValue] = useState("")
    const [selectedOptions, setSelectedOptions] = previousCategories ? useState(previousCategories) : useState([])

    const handleInputChange = (text) => {
        setInputValue(text)
    }

    const categories = ["Música", "Art", "Concerts", "Esport", "Política", "Feminisme", "Infantil", "Llibres", "Tallers", "Xerrades"].sort()

    const handleOptionPress = (option) => {
        if (!selectedOptions.includes(option)) {
            setSelectedOptions([...selectedOptions, option])
            selectedCategories([...selectedOptions, option])
        }
        setInputValue("")
    }

    const handleRemoveOption = (option) => {
        setSelectedOptions(selectedOptions.filter((item) => item !== option))
        const updatedSelectedOptions = selectedOptions.filter((item) => item !== option)

        selectedCategories(updatedSelectedOptions)
    }

    return (
        <View>
            <View style={{ flex: 1 }}>
                <TextInput
                    value={inputValue}
                    onChangeText={handleInputChange}
                    placeholder={placeholderText}
                    style={styles.input}
                />
                {inputValue.length > 0 && (
                    <View style={styles.optionsContainer}>
                        {categories
                            .filter((option) => option.toLowerCase().includes(inputValue.toLowerCase()))
                            .map((item, index) => (
                                <Pressable
                                    key={index}
                                    style={styles.option}
                                    onPress={() => handleOptionPress(item)}
                                >
                                    <Text style={styles.optionText}>{item}</Text>
                                </Pressable>
                            ))}
                    </View>
                )}
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    {selectedOptions && selectedOptions.map((option) => (
                        <Pressable style={styles.selected} key={option} onPress={() => handleRemoveOption(option)}>
                            <Text style={styles.selectedText}>{option} <MaterialIcons name="cancel" size={16} color="black" /> </Text>
                        </Pressable>
                    ))}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 44,
        backgroundColor: "white",
        marginBottom: 10,
        padding: 10,
        borderRadius: 8,
    },
    option: {
        padding: 4,
    },
    optionText: {
        fontSize: 16
    },
    selected: {
        padding: 8,
        backgroundColor: "#f3ca52",
        borderRadius: 12,
        display: "flex",
        alignItems: "center",
        margin: 4,
        marginBottom: 10
    },
    selectedText: {
        fontSize: 16,
        fontWeight: "bold",
    }
})