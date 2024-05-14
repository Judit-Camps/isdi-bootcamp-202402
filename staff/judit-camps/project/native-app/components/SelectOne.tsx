// @ts-nocheck
import React, { useState } from "react"
import { View, TextInput, FlatList, Text, Pressable, StyleSheet } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"

export default function SelectOne({ items, placeholderText, valueChosen, chosenOrg }) {

    const [inputValue, setInputValue] = useState("")
    const [selectedOption, setSelectedOption] = useState(chosenOrg ? chosenOrg : null)
    const [selectedName, setSelectedName] = useState(chosenOrg ? chosenOrg.name : null)

    const handleInputChange = (text) => {
        setInputValue(text)
    }

    const handleOptionPress = (option) => {
        setSelectedOption(option.id)
        setSelectedName(option.name)
        setInputValue("")

        const org = { id: option.id, name: option.name }
        valueChosen(org)

    }

    const handleRemoveOption = () => {
        setSelectedOption(null)
        setSelectedName(null)

        valueChosen("")
    }

    const renderOptionItem = ({ item }) => (
        <Pressable style={styles.option} onPress={() => handleOptionPress(item)}>
            <Text style={styles.optionText}>{item.name}</Text>
        </Pressable>
    )

    return (
        <View style={{ flex: 1 }}>
            <TextInput
                value={inputValue}
                onChangeText={handleInputChange}
                placeholder={placeholderText}
                style={styles.input}
            />
            {inputValue.length > 0 && (
                <FlatList
                    data={items.filter((option) => option.name.toLowerCase().includes(inputValue.toLowerCase()))}
                    renderItem={renderOptionItem}
                    keyExtractor={(item) => item}
                />
            )}

            {(selectedOption && selectedName) && (
                <Pressable style={styles.selected} onPress={handleRemoveOption}>
                    <Text style={styles.selectedText}>{selectedName} <MaterialIcons name="cancel" size={16} color="black" /> </Text>
                </Pressable>
            )}


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