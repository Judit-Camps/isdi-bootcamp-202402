import { View, Text, StyleSheet, Button } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import RegisterRegScreen from "../screens/RegisterRegScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterOrgScreen from "../screens/RegisterOrgScreen";
import HomeScreen from "../screens/HomeScreen";

const Stack = createNativeStackNavigator()

export default function HomeStack() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="RegisterOrg" component={RegisterOrgScreen} />
            <Stack.Screen name="RegisterReg" component={RegisterRegScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        position: 'absolute',
        display: 'flex',
        flexDirection: 'row',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',

    }
})