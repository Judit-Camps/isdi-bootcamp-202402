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
                text: "+ Filtres",
            },
            {
                key: "1",
                text: "Tallers",
            },
            {
                key: "2",
                text: "Art",
            },
            {
                key: "3",
                text: "Música",
            },
            {
                key: "4",
                text: "Concerts",
            },
            {
                key: "5",
                text: "Xerrades",
            },
            {
                key: "6",
                text: "Llibres",
            }
        ]
    }
]

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    title: {
        fontSize: 20,
        padding: 4
    },
    itemDiv: {
        backgroundColor: "red",
        padding: 16,
        margin: 8,
        height: "auto",
        width: 100,
        borderRadius: 16
    },
    itemText: {
        fontSize: 16,
        textAlign: "center",
    }
})