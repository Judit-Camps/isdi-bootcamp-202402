// @ts-nocheck
import React, { useState } from "react"
import logic from "../logic"
import { useContext } from "../context"

import { View, Text, Button, TextInput, StyleSheet, Alert } from "react-native"
export default function LoginScreen({ navigation }) {

    const { setUser, setRole } = useContext()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = () => {

        try {
            logic.loginUser(username, password)
                .then(() => {
                    setUsername('')
                    setPassword('')
                    logic.retrieveUser()
                        .then(user => {
                            setUser(user)
                            logic.getUserRole()
                                .then(setRole)
                        })
                        .then(navigation.navigate("Home"))

                })
                .catch(error => {
                    Alert.alert(error.message)
                })

        } catch (error) {
            console.error(error.message)
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

            <Button title="Cancel" onPress={() => navigation.navigate("Home")} />
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
        width: '90%',
        height: 48,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 16,
        padding: 8,
        borderRadius: 16,
        fontSize: 16
    },
})