import { View, ScrollView, Text, StyleSheet, Button, Pressable, Alert } from "react-native";
import logic from "../logic";
import { useContext } from "../context"
import { Ionicons, AntDesign } from '@expo/vector-icons';
import EventListOrg from "../components/EventListOrg";
import { useEffect } from "react";

export default function UserScreen({ navigation }) {
    const { user, setUser, role, setRole } = useContext()

    const handleLogOutClick = () => {
        try {
            logic.logOutUser()
            setUser(null)
            setRole(null)
            navigation.navigate("Home")

        } catch (error) {
            console.error(error)
        }
    }

    // useEffect(() => {
    //     try {
    //     } catch (error)
    // }, [])

    return (
        <View style={styles.main}>
            {user !== null ? (
                <View>
                    <View >
                        <View style={styles.header} >
                            <Text style={styles.title} >{user.name}</Text>
                            <Text style={styles.title} >{user.username}</Text>

                            <Pressable style={styles.button} onPress={handleLogOutClick}>
                                <Text style={styles.buttonText}>Tancar sessió</Text>
                            </Pressable>

                            <Pressable style={styles.button} onPress={() => Alert.alert("Function yet to come")}>
                                <Text style={styles.buttonText}>Editar perfil</Text>
                            </Pressable>
                        </View>

                    </View>
                    <ScrollView>
                        <Text style={styles.text}>Hello hello hello</Text>
                    </ScrollView>

                    {role === "regular" ? (
                        <View>
                            <Text>Esdeveniments guardats</Text>
                        </View>
                    ) : (
                        <View>
                            <Text>Hello org</Text>
                        </View>
                    )}
                </View>

            ) : (
                <View>
                    <Text style={styles.text} >Inicia sessió per poder veure les teves activitats guardades!</Text>
                    <Button title="Iniciar sessió" onPress={() => navigation.navigate("Login")} />

                    <Text style={styles.text}>Encara no tens un compte?</Text>
                    <Button title="Registrar-se" onPress={() => navigation.navigate("RegisterReg")} />

                    <Text style={styles.text}>Sou una organització o associació i voleu ensenyar tot el que feu?</Text>
                    <Button title="Registra-se com a organització" onPress={() => navigation.navigate("RegisterOrg")} />

                </View>
            )
            }
        </View>
    )
}


const styles = StyleSheet.create({
    main: {
        backgroundColor: "#E4F1E4",
        height: "100%"
    },
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
        backgroundColor: "#F6E9B2"
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        margin: 16,
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

    button: {
        width: "20%",
        height: 48,
        backgroundColor: "#7ABA78",
        borderRadius: 24,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },

    buttonText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#ffffff",
        textAlign: "center",
        padding: 6
    },
})