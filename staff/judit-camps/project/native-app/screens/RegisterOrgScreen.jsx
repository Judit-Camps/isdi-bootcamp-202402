import { View, Text, StyleSheet, Button, Pressable } from "react-native";
export default function RegisterOrgScreen({ navigation }) {

    return (
        <View style={styles.container} >
            <Text style={styles.text} >
                Un cop registra't,
            </Text>

            <Pressable style={({ pressed }) => [
                styles.button,
                pressed && { backgroundColor: 'rgba(0, 0, 0, 0.1)' },
            ]}
                onPress={() => navigation.navigate("Login")} >
                <Text>Inicia sessió</Text>
            </Pressable>
            <Button style={{ backgroundColor: '#AD40AA' }} color='#000000' title="Registra't" />
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
    button: {
        padding: 16,
        borderRadius: 8,
        backgroundColor: '#f09890'
    },
})