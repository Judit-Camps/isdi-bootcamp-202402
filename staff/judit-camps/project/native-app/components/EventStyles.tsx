import { StyleSheet } from "react-native"

const eventStyles = StyleSheet.create({
    eventContainer: {
        backgroundColor: "#F6E9B2",
        borderRadius: 16,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        padding: 16,
        margin: 16,
        minHeight: 180,
        marginBottom: 0
    },
    toggle: {
        backgroundColor: "#f3ca52",
        borderBottomRightRadius: 16,
        borderBottomLeftRadius: 16,
        marginTop: 0,
        padding: 16,
        margin: 16,
        height: 40,
        display: "flex",
        justifyContent: "center", // Center vertically
        alignItems: "center", // Center horizontally
        position: "relative", // Needed for positioning the absolute child
    },
    toggleIcon: {
        position: 'absolute',
        bottom: 12,
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