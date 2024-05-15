// @ts-nocheck
import { useState } from "react"
import { Text, View, FlatList, SectionList, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native"

const ItemList = ({ item, onFilterPressed, onFilterUnpressed }) => {

    const [pressed, setPressed] = useState(false)

    const handlePress = (item) => {
        console.log(item)
        if (item !== "+ Filtres")
            setPressed(true)
        onFilterPressed(item)
    }

    const handleUnpress = (item) => {
        onFilterUnpressed(item)
        setPressed(false)
    }

    return (
        pressed ? (
            <TouchableOpacity style={styles.pressedItemDiv} onPress={() => handleUnpress(item.text)}>
                <Text style={styles.itemTextPressed} >{item.text}</Text>
            </TouchableOpacity >
        ) : (
            <TouchableOpacity style={styles.itemDiv} onPress={() => handlePress(item.text)}>
                <Text style={styles.itemText} >{item.text}</Text>
            </TouchableOpacity>
        )
    )
}

export default function FilterDiv({ onAddFilter, onRemoveFilter }) {
    const handleFilterPress = (filter) => {
        onAddFilter(filter)
    }

    const handleFilterUnpress = (filter) => {
        onRemoveFilter(filter)
    }
    return (
        <View style={styles.container}>
            <SafeAreaView>
                <SectionList
                    sections={SECTIONS}
                    renderSectionHeader={({ section }) => (

                        <>
                            <Text style={styles.title}>{section.title}</Text>
                            <FlatList
                                data={section.data}
                                horizontal
                                renderItem={({ item }) => {
                                    return <ItemList item={item} onFilterPressed={handleFilterPress} onFilterUnpressed={handleFilterUnpress} />
                                }}
                            />
                        </>
                    )}
                    renderItem={({ item, section }) => {
                        return null
                        return <ItemList item={item} />
                    }}
                />

            </SafeAreaView>
        </View>

    )

}

const sectionTitles = ["Filtres"]
const sectionData = [
    ["+ Filtres", "Tallers", "Art", "Música", "Concerts", "Xerrades", "Llibres"]
]

const SECTIONS = sectionTitles.map((title, index) => {
    return {
        title,
        data: sectionData[index].map((text, key) => ({
            key: key.toString(),
            text
        }))
    }
})

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    title: {
        fontSize: 20,
        padding: 4
    },
    itemDiv: {
        backgroundColor: "#7aba78",
        padding: 16,
        margin: 8,
        height: "auto",
        width: 110,
        borderRadius: 16
    },
    pressedItemDiv: {
        backgroundColor: "#0a6847",
        padding: 16,
        margin: 8,
        height: "auto",
        width: 110,
        borderRadius: 16
    },
    itemText: {
        fontSize: 16,
        textAlign: "center",
    },
    itemTextPressed: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
        textAlign: "center",
    }
})