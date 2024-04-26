// @ts-nocheck
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeStack from './HomeStack'
import UserScreen from '../screens/UserScreen'
import { Ionicons, AntDesign } from '@expo/vector-icons';

const Tab = createBottomTabNavigator()

export default function Tabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: '#ff9999',
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
            }}
        >
            <Tab.Screen name="Home" component={HomeStack} options={{
                tabBarIcon: () => (<AntDesign name='home' color="#000000" size={30} />)
            }} />
            <Tab.Screen name="User" component={UserScreen} options={{
                tabBarIcon: () => (<AntDesign name='user' color="#000000" size={30} />)
            }} />

        </Tab.Navigator>
    )
}