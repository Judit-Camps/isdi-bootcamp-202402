// @ts-nocheck
import { View, Text, StyleSheet } from "react-native"
import CreateEventForm from "../components/CreateEventForm"

export default function CreateScreen({ navigation }) {

    const handleEventCreated = () => {
        navigation.navigate("Home")
    }
    return (

        <View style={styles.container}>
            <CreateEventForm onEventCreated={handleEventCreated} />
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        marginTop: 40,
        backgroundColor: 'pink',
        borderRadius: 16,
        margin: 16
    }
})