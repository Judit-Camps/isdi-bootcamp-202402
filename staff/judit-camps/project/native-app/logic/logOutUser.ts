import AsyncStorage from "@react-native-async-storage/async-storage"

function logOutUser() {
    AsyncStorage.removeItem('token')
}

export default logOutUser