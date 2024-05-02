import { useState } from "react";
import logic from "../logic";
import { View, Text, StyleSheet, Button, TextInput, ScrollView } from "react-native";

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
                <Text style={styles.text} >Registra't</Text>

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

                <Button title="Començar" onPress={handleOnRegisterClick} />
                <Button title="Registra't com a organització" onPress={() => navigation.navigate("RegisterOrg")} />
            </View>
        </ScrollView>
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