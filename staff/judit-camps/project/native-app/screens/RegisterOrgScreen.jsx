import { View, Text, StyleSheet, Button, Pressable, TextInput, ScrollView } from "react-native"
import { useState } from "react"
import logic from "../logic"

export default function RegisterOrgScreen({ navigation }) {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [location, setLocation] = useState('')
    const [address, setAddress] = useState('')
    const [description, setDescription] = useState('')

    const handleOnRegisterClick = () => {
        try {
            logic.registerOrg(name, username, email, password, location, address, description)
                .then(() => {
                    setName('')
                    setUsername('')
                    setEmail('')
                    setPassword('')
                    setLocation('')
                    setDescription('')
                    setAddress('')
                    navigation.navigate("Login")
                })
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }

    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}
            style={{ backgroundColor: "#F6E9B2" }}
            keyboardShouldPersistTaps='handled'>

            <View style={styles.container} >
                <Text style={styles.title}>Registra't com a organització</Text>

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

                <TextInput style={styles.input} placeholder="Ciutat/Poble" value={location} onChangeText={setLocation} />

                <TextInput style={styles.input} placeholder="Adreça" value={address} onChangeText={setAddress} />

                <TextInput style={styles.inputArea} multiline={true} placeholder="Descripció" value={description} onChangeText={setDescription} />


                <Pressable style={({ pressed }) => [
                    styles.button,
                    pressed && { backgroundColor: 'rgba(0, 0, 0, 0.1)' },
                ]}
                    onPress={handleOnRegisterClick} >
                    <Text>Registra't</Text>
                </Pressable>
                {/* <Button style={{ backgroundColor: '#AD40AA' }} color='#000000' title="Registra't" /> */}

                <Button title="Cancel" onPress={() => navigation.navigate("Home")} />
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

    button: {
        width: "80%",
        height: 48,
        backgroundColor: "#7ABA78",
        borderRadius: 24,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },

    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#ffffff", // White color
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


