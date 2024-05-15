import { useState } from "react"
import logic from "../logic"
import { View, Text, StyleSheet, Button, TextInput, ScrollView, Pressable } from "react-native"
import basicStyles from "../styles/basicStyles"


export default function RegisterRegScreen({ navigation }) {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleOnRegisterClick = () => {

        try {
            logic.registerUser(name, username, email, password)
                .then(() => {
                    setName('')
                    setUsername('')
                    setEmail('')
                    setPassword('')
                    navigation.navigate("Login")
                })
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }

    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps='handled'>

            <View style={styles.container} >
                <Text style={styles.title} >Registra't</Text>

                <TextInput style={styles.input} placeholder="Nom"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput style={styles.input} placeholder="Nom d'usuari"
                    value={username}
                    autoCapitalize="none"
                    onChangeText={setUsername}
                />
                <TextInput style={styles.input} placeholder="Email"
                    value={email}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={setEmail}
                />
                <TextInput secureTextEntry={true} style={styles.input} placeholder="Contrassenya"
                    value={password}
                    onChangeText={setPassword}
                />

                <Pressable style={basicStyles.buttonPrimary} onPress={handleOnRegisterClick} >
                    <Text style={styles.buttonText}>Comença</Text>
                </Pressable>


                <Pressable style={basicStyles.buttonSecondary} onPress={() => navigation.navigate("RegisterOrg")}>
                    <Text style={styles.buttonText}>Registra't com a organització</Text>
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
        textAlign: 'center',
    },
    input: {
        width: "100%",
        height: 48,
        borderRadius: 24,
        paddingHorizontal: 20,
        marginBottom: 20,
        backgroundColor: "#ffffff",
    },

    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#ffffff",
    },
    buttonSecondary: {
        width: "80%",
        height: 48,
        backgroundColor: "#7ABA78",
        borderRadius: 24,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    buttonTextSecondary: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#ffffff",
    },
    inputArea: {
        width: "100%",
        height: 100,
        borderRadius: 24,
        paddingHorizontal: 20,
        marginBottom: 20,
        backgroundColor: "#ffffff",
        fontSize: 16
    },
})