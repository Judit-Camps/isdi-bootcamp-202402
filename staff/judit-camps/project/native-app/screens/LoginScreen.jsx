// @ts-nocheck
import React, { useState } from "react"
import logic from "../logic"
import { useContext } from "../context"
import basicStyles from "../styles/basicStyles"

import { ScrollView, Text, Pressable, TextInput, StyleSheet, Alert, View } from "react-native"
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
                    return Promise.all([
                        logic.retrieveUser(),
                        logic.getUserRole()
                    ])
                })
                .then(([user, role]) => {
                    setUser(user)
                    setRole(role)
                })
                .then(() => navigation.navigate("Home"))
                .catch(error => {
                    console.log(error.message)
                    Alert.alert(error.message)
                })
        } catch (error) {
            console.error(error.message)
            Alert.alert(error.message)
        }
    }

    return (
        <ScrollView style={{ backgroundColor: "#F6E9B2" }} contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps='handled'
        >
            <View style={styles.container}>
                <Text style={styles.title}>Inicia sessió</Text>

                <TextInput style={styles.input} placeholder="Nom d'usuari"
                    value={username}
                    autoCapitalize="none"
                    onChangeText={setUsername}
                />
                <TextInput secureTextEntry={true} style={styles.input} placeholder="Contrassenya"
                    value={password}
                    onChangeText={setPassword}
                />

                <Pressable style={basicStyles.buttonPrimary} onPress={handleLogin}>
                    <Text style={styles.buttonTextPrimary}>Entra</Text>
                </Pressable>
                <Pressable style={basicStyles.buttonSecondary} onPress={() => navigation.navigate("RegisterReg")}>
                    <Text style={styles.buttonTextSecondary}>Registra't</Text>
                </Pressable>
                <Pressable style={basicStyles.buttonSecondary} onPress={() => navigation.navigate("Home")}>
                    <Text style={styles.buttonTextSecondary}>Cancel·la</Text>
                </Pressable>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
        backgroundColor: "#F6E9B2"
    },
    title: {
        fontSize: 36,
        fontWeight: "bold",
        marginBottom: 36,
        color: "#0A6847",
    },
    input: {
        width: "100%",
        height: 48,
        borderRadius: 24,
        paddingHorizontal: 20,
        marginBottom: 20,
        backgroundColor: "#ffffff",
    },


    buttonTextPrimary: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#ffffff",
    },
    buttonTextSecondary: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#ffffff",
    },
})