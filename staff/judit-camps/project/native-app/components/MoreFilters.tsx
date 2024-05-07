// @ts-nocheck
import { View, Text, Pressable, TextInput, StyleSheet } from "react-native"
export default function MoreFilters({ onCancelClick }) {

    const handleApplyClick = () => {
        console.log("Aplica canvis")
    }

    const handleCancelClick = () => {
        onCancelClick()
    }

    return (
        <View style={styles.container}>

            <View style={styles.smallContainer}>
                <TextInput placeholder="preu" />
                <TextInput placeholder="ciutat" />

                <Pressable onPress={handleCancelClick}>
                    <Text>Cancel</Text>
                </Pressable>


                <Pressable onPress={handleApplyClick}>
                    <Text>Aplicar canvis</Text>
                </Pressable>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        zIndex: 1,
        backgroundColor: "rgba(243, 202, 82, 0.2)",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: [{ translateY: -120 }]
    },
    smallContainer: {
        backgroundColor: "grey",
        width: "85%",
        height: "60%",
        display: "flex",
        borderRadius: 24
    }
})
