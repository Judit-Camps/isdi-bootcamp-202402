import { View, Text, StyleSheet } from "react-native"

export default function Event() {
    return (
        <View style={styles.eventContainer}>
            <Text>Act 1</Text>
            <Text>Ort 1</Text>
            <Text style={styles.description}>Descripció jshdfjkahuileuhglkasjhdvkjanskjdvnkasjdnvkjaskdjvnkajsdjvns</Text>
        </View>

    )
}

const styles = StyleSheet.create({
    eventContainer: {
        backgroundColor: 'grey',
        borderRadius: 16,
        padding: 8,
        margin: 16,
        height: 140
    },
    description: {
        fontSize: 16
    }
})