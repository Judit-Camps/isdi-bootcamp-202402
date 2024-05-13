// @ts-nocheck
import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, Modal, Button } from 'react-native';

export default function PriceSelector() {
    const [inputValue, setInputValue] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [priceInputVisible, setPriceInputVisible] = useState(false);
    const [price, setPrice] = useState('');

    const options = ["Free", "Pay what you want", "Price"];

    const handleInputChange = (text) => {
        setInputValue(text);
    };

    const handleOptionPress = (option) => {
        setSelectedOption(option);
        if (option === "Price") {
            setPriceInputVisible(true);
        } else {
            setSelectedOptions([option]);
            setInputValue('');
            setPriceInputVisible(false);
        }
    };

    const handleRemoveOption = (option) => {
        setSelectedOptions(selectedOptions.filter((item) => item !== option));
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handlePriceInputChange = (text) => {
        setPrice(text);
    };

    const renderOptionItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleOptionPress(item)}>
            <Text>{item}</Text>
        </TouchableOpacity>
    );

    const renderSelectedOptions = () => (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {selectedOptions.map((option) => (
                <TouchableOpacity key={option} onPress={() => handleRemoveOption(option)}>
                    <Text style={{ margin: 5 }}>{option}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );

    const renderDropdown = () => (
        <Modal visible={showDropdown} animationType="slide">
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <FlatList
                    data={options}
                    renderItem={renderOptionItem}
                    keyExtractor={(item) => item}
                />
                <Button title="Close" onPress={toggleDropdown} />
            </View>
        </Modal>
    );

    const renderPriceInput = () => (
        <TextInput
            value={price}
            onChangeText={handlePriceInputChange}
            placeholder="Enter price"
            keyboardType="numeric"
            style={{ marginBottom: 10, borderWidth: 1, padding: 10 }}
        />
    );

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                    value={inputValue}
                    onChangeText={handleInputChange}
                    placeholder="Type something..."
                    style={{ flex: 1, marginBottom: 10, borderWidth: 1, padding: 10 }}
                />
                <TouchableOpacity onPress={toggleDropdown}>
                    <Text>Show Options</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={options}
                renderItem={renderOptionItem}
                keyExtractor={(item) => item}
            />
            {renderSelectedOptions()}
            {selectedOption === "Price" && priceInputVisible && renderPriceInput()}
            {renderDropdown()}
        </View>
    );
};
