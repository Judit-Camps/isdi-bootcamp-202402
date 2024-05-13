// @ts-nocheck
import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, Pressable, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Selection({ categories, placeholderText, selectedCategories }) {
    const [inputValue, setInputValue] = useState('');
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleInputChange = (text) => {
        setInputValue(text);
    };

    const handleOptionPress = (option) => {
        if (!selectedOptions.includes(option)) {
            setSelectedOptions([...selectedOptions, option])
            selectedCategories([...selectedOptions, option])
        }
        setInputValue('');
    };

    const handleRemoveOption = (option) => {
        setSelectedOptions(selectedOptions.filter((item) => item !== option));
    };

    const renderOptionItem = ({ item }) => (
        <Pressable onPress={() => handleOptionPress(item)}>
            <Text>{item}</Text>
        </Pressable>
    );

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
                    <FlatList
                        data={categories.filter((option) => option.toLowerCase().includes(inputValue.toLowerCase()))}
                        renderItem={renderOptionItem}
                        keyExtractor={(item) => item}
                    />
                )}
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {selectedOptions.map((option) => (
                        <Pressable style={styles.selected} key={option} onPress={() => handleRemoveOption(option)}>
                            <Text>{option} <MaterialIcons name="cancel" size={16} color="black" /> </Text>
                        </Pressable>
                    ))}
                </View>
            </View>
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
        margin: 2
    }
})