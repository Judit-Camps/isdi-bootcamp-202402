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
            keyboardShouldPersistTaps='handled'>

            <View style={styles.container} >
                <Text>Registra't com a organització</Text>

                <TextInput style={styles.input} placeholder="Nom"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput style={styles.input} placeholder="Nom d'usuari"
                    value={username}
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

    inputArea: {
        width: '90%',
        height: 90,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 16,
        padding: 8,
        borderRadius: 16,
        fontSize: 16
    },

    button: {
        padding: 16,
        borderRadius: 8,
        backgroundColor: '#f09890'
    },
})