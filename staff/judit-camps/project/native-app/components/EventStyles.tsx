import { StyleSheet } from "react-native"

const eventStyles = StyleSheet.create({
    eventContainer: {
        backgroundColor: "#F6E9B2",
        borderRadius: 16,
        padding: 16,
        margin: 16,
        minHeight: 180,
    },
    eventTitle: {
        fontSize: 28,
        color: 'black',
    },
    topIcon: {
        position: 'absolute',
        right: 12,
        top: 12,
    },
    deleteIcon: {
        position: 'absolute',
        right: 12,
        bottom: 12,
    },
    eventOrganization: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 6
    },
    eventLocation: {
        fontSize: 16,
        padding: 6
    },
    description: {
        fontSize: 16,
    },
    moreInfo: {
        fontSize: 16,
        marginTop: 8,
    },
})

export default eventStyles