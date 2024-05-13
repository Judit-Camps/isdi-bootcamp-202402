// @ts-nocheck
import { View, Text, Pressable, StyleSheet } from "react-native"

export default function Confirm({ message, onAcceptClick, onCancelClick }) {
    return (
        <View style={styles.container} >
            <Text>{message}</Text>
            <View style={styles.buttonsContainer} >
                <Pressable style={styles.button} onClick={onCancelClick}>
                    <Text>Cancel</Text>
                </Pressable>
                <Pressable style={styles.button} onClick={onAcceptClick} >
                    <Text>Accept</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    button: {
        padding: 10,
        marginHorizontal: 5,
        backgroundColor: '#DDDDDD',
    },
})