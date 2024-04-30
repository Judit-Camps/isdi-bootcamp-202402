import { View, ScrollView, Text, StyleSheet, Button } from "react-native";
import logic from "../logic";
import { useContext } from "../context"

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
    return (
        <View>
            {user !== null ? (
                <View style={styles.container} >
                    <View >
                        <Text style={styles.text} >{user.name}</Text>
                        <Text style={styles.text} >{user.username}</Text>
                        <Button title="Edit" onPress={() => navigation.navigate("Home")} />
                        <Button title="Sortir" onPress={handleLogOutClick} />
                    </View>
                    <ScrollView>
                        <Text style={styles.text}>Hello hello hello</Text>
                    </ScrollView>
                    {role === "regular" ? (
                        <View>
                            <Text>Hello regular</Text>
                        </View>
                    ) : (
                        <View>
                            <Text>Hello org</Text>
                        </View>
                    )}
                </View>

            ) : (
                <View>
                    <Text style={styles.text} >User Screen</Text>
                    <Button title="Login" onPress={() => navigation.navigate("Login")} />
                </View>
            )
            }
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60
    },
    header: {
        backgroundColor: "#ffffff",
        width: "100%",
        height: "15%",
        padding: 16,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold'
    }
})