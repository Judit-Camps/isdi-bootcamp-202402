import { View, Text, Pressable, TextInput } from "react-native"
export default function MoreFilters() {

    const handleApplyClick = () => {
        console.log("Aplica canvis")
    }

    const handleCancelClick = () => {
        console.log("cancel")
    }

    return (
        <View>

            <TextInput placeholder="preu" />
            <TextInput placeholder="ciutat" />

            <Pressable onPress={handleCancelClick}>
                <Text>Cancel</Text>
            </Pressable>


            <Pressable onPress={handleApplyClick}>
                <Text>Aplicar canvis</Text>
            </Pressable>
        </View>
    )
}

