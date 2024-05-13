// @ts-nocheck
import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, Pressable, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function SelectOne({ categories, placeholderText }) {
    const [inputValue, setInputValue] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedName, setSelectedName] = useState('')

    const handleInputChange = (text) => {
        setInputValue(text);
    };

    const handleOptionPress = (option) => {
        setSelectedOption(option.id)
        setSelectedName(option.name)
        setInputValue('');
    };

    const renderOptionItem = ({ item }) => (
        <Pressable onPress={() => handleOptionPress(item)}>
            <Text>{item.name}</Text>
        </Pressable>
    );

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
                    data={categories.filter((option) => option.name.toLowerCase().includes(inputValue.toLowerCase()))}
                    renderItem={renderOptionItem}
                    keyExtractor={(item) => item}
                />
            )}

            {selectedOption.length > 0 && (
                <Pressable style={styles.selected} onPress={() => setSelectedOption('')}>
                    <Text>{selectedName} <MaterialIcons name="cancel" size={16} color="black" /> </Text>
                </Pressable>
            )}


        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 44,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
        borderRadius: 8,
    },
    textInput: {

    },
    selected: {
        padding: 5,
        backgroundColor: "red",
        borderRadius: 12,
        display: "flex",
        alignItems: "center",
        margin: 2,
        width: "50%"
    }
})