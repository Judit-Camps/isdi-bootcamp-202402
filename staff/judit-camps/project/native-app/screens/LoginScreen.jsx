import React, { useState } from "react"
import logic from "../logic"

import { View, Text, Button, TextInput, StyleSheet } from "react-native"
export default function LoginScreen({ navigation }) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = () => {
        console.log("Username:", username)
        console.log("Password:", password)


        try {
            logic.loginUser(username, password)
                .then(() => {
                    setUsername('')
                    setPassword('')
                })
                .catch(error => console.error(error.message))
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <View style={styles.container} >
            <Text>Login here</Text>

            <TextInput style={styles.input} placeholder="Nom d'usuari"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput secureTextEntry={true} style={styles.input} placeholder="Contrassenya"
                value={password}
                onChangeText={setPassword}
            />

            <Button title="Entrar" onPress={handleLogin} />
            <Button title="Registra't" onPress={() => navigation.navigate("RegisterReg")} />
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
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        padding: 12,
        borderRadius: 12
    },
})