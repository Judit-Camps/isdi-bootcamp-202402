import { View, Text, StyleSheet, Button } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useState } from "react";

const Stack = createNativeStackNavigator()

export default function HomeScreen({ navigation }) {
    const [user, setUser] = useState('')
    return (
        <View style={styles.container} >
            <Text style={styles.text} >Hola!</Text>

            <Button style={styles.button} title="Entrar" onPress={() => navigation.navigate("Login")} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'space-between',
        top: 0,
        display: 'flex',
        flexDirection: 'row',
        padding: 12,
        marginTop: 40
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    button: {

    },
})