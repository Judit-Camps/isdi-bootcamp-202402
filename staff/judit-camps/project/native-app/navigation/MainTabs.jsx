// @ts-nocheck
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import UserScreen from '../screens/UserScreen'
import { Ionicons, AntDesign } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import { useContext } from '../context';
import CreateScreen from '../screens/CreateScreen';

const Tab = createBottomTabNavigator()

const tabScreenOptions = {
    headerShown: false,
    tabBarShowLabel: false,
    tabBarStyle: {
        backgroundColor: '#7ABA78',
        borderRadius: 20,
        height: 90,
        bottom: 20,
        left: 20,
        right: 20,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
        paddingBottom: 10

    },
}

export default function MainTabs() {
    const { user, role } = useContext()
    return (

        (role === "organization" && user) ? (

            <Tab.Navigator
                screenOptions={tabScreenOptions}
            >
                <Tab.Screen name="Home" component={HomeScreen} options={{
                    tabBarIcon: () => (<AntDesign name='home' color="#000000" size={30} />)
                }} />
                <Tab.Screen name="Create" component={CreateScreen} options={{
                    tabBarIcon: () => (<AntDesign name='plus' color="#000000" size={30} />)
                }} />

                <Tab.Screen name="User" component={UserScreen} options={{
                    tabBarIcon: () => (<AntDesign name='user' color="#000000" size={30} />)
                }} />

            </Tab.Navigator>


        ) : (
            <Tab.Navigator
                screenOptions={tabScreenOptions}
            >
                <Tab.Screen name="Home" component={HomeScreen} options={{
                    tabBarIcon: () => (<AntDesign name='home' color="#000000" size={30} />)
                }} />

                <Tab.Screen name="User" component={UserScreen} options={{
                    tabBarIcon: () => (<AntDesign name='user' color="#000000" size={30} />)
                }} />

            </Tab.Navigator >
        )

    )
}


