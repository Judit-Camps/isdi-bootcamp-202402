// @ts-nocheck
import { Text, View, FlatList, SectionList, SafeAreaView, StyleSheet } from "react-native"

const ItemList = ({ item }) => {
    return (
        <View style={styles.itemDiv}>
            <Text style={styles.itemText} >{item.text}</Text>
        </View>
    )
}

export default function FilterDiv() {
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
                                    return <ItemList item={item} />
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

const SECTIONS = [
    {
        title: "Filtres",
        data: [
            {
                key: "0",
                text: "add more filters",
            },
            {
                key: "1",
                text: "item 1",
            },
            {
                key: "2",
                text: "item 2",
            },
            {
                key: "3",
                text: "item 3",
            },
            {
                key: "4",
                text: "item 4",
            }
        ]
    }
]

const styles = StyleSheet.create({
    container: {
        padding: 16
    },
    title: {
        fontSize: 24
    },
    itemDiv: {
        backgroundColor: "red",
        padding: 16,
        margin: 16,
        height: 120,
        width: 100,
        borderRadius: 16
    },
    itemText: {
        fontSize: 16,
        textAlign: "center",
    }
})