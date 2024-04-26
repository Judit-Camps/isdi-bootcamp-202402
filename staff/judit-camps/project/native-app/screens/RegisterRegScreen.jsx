import { View, Text, StyleSheet, Button } from "react-native";

export default function RegisterRegScreen({ navigation }) {
    return (
        <View style={styles.container} >
            <Text style={styles.text} >Registra't</Text>

            <Button title="Començar" onPress={() => navigation.navigate("Login")} />
            <Button title="Registra't com a organització" onPress={() => navigation.navigate("RegisterOrg")} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        marginTop: 40
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',

    },
})