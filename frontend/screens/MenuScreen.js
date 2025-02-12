import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const MenuScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>

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
                onPress={() => navigation.navigate('School')}>
                <Text style={styles.buttonText}>Sign Language School</Text>
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
        padding: moderateScale(10),
    },
    title: {
        fontSize: scale(24),
        fontWeight: 'bold',
        marginBottom: verticalScale(20),
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: verticalScale(12),
        paddingHorizontal: scale(20),
        marginVertical: verticalScale(10),
        width: '80%',
        borderRadius: moderateScale(8),
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: scale(16),
        fontWeight: 'bold',
    },
});

export default MenuScreen;
