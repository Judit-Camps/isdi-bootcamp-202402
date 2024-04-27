import { View, ScrollView, Text, StyleSheet, Button } from "react-native";

export default function UserScreen({ navigation }) {
    return (
        <View style={styles.container} >
            <View style={styles.header} >
                <Text style={styles.text} >User Screen</Text>
                <Button title="Edit" onPress={() => navigation.navigate("Home")} />
            </View>
            <ScrollView>
                <Text style={styles.text}>Hello hello hello</Text>
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
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