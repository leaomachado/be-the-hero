import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20
    },

    header: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    incident: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        marginBottom: 16,
        marginTop: 48,
        padding: 24
    },

    incidentProperty: {
        color: '#41414D',
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 24
    },

    incidentValue: {
        color: '#737380',
        fontSize: 15,
        marginTop: 8
    },

    contactBox: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        marginBottom: 16,
        padding: 24
    },

    heroTitle: {
        color: '#13131A',
        fontSize: 20,
        fontWeight: 'bold',
        lineHeight: 30
    },

    heroDescription: {
        color: '#737380',
        fontSize: 15,
        marginTop: 16
    },

    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16
    },

    action: {
        alignItems: 'center',
        backgroundColor: '#E02041',
        borderRadius: 8,
        height: 50,
        justifyContent: 'center',
        width: '48%'
    },

    actionText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: 'bold'
    }
});
