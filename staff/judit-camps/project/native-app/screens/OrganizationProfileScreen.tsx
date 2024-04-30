// @ts-nocheck
import { View, Text, StyleSheet, Button } from "react-native";
import { useRoute } from "@react-navigation/native";

export default function OrganizationProfileScreen({ navigation }) {

    const route = useRoute()
    const { author } = route.params
    console.log(author.name)
    return (

        <View style={styles.header}>
            < Button style={styles.headerButton} title="<" onPress={() => navigation.navigate("Home")} />
            <View >
                <Text style={styles.headerText}>{author.name}</Text>
            </View>

        </View >
    )
}

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        justifyContent: 'space-between',
        top: 0,
        display: 'flex',
        flexDirection: 'row',
        padding: 12,
        backgroundColor: '#fff086'
    },
    headerText: {
        marginTop: 40,
        fontSize: 24,
        fontWeight: 'bold',
    },
    headerButton: {
        marginTop: 90,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    button: {

    },
    h1: {
        fontSize: 160,
        marginBottom: 30
    },
    act: {
        backgroundColor: '#a99f00',
        borderRadius: 12,
        margin: 12,
        height: 120,
        padding: 12
    }
})