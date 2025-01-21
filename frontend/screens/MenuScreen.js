import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const MenuScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>SignSri - Menu</Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('SignToText')}>
                <Text style={styles.buttonText}>Sign to Text</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('TextToSign')}>
                <Text style={styles.buttonText}>Text to Sign</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Dictionary')}>
                <Text style={styles.buttonText}>Sign Language Dictionary</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('School')}>
                <Text style={styles.buttonText}>Sign Language School</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Phrasebook')}>
                <Text style={styles.buttonText}>Sign Language Phrasebook</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('CommunityForum')}>
                <Text style={styles.buttonText}>Community Forum</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 15,
        marginVertical: 10,
        width: '80%',
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default MenuScreen;
